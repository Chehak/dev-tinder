const express = require('express');
const userRouter = express.Router();
const { userAuth } = require('../middlewares/adminMiddleware');
const ConnectionRequest = require('../modals/connectionRequest');
const SAFE_USER_PARAMETERS = "firstName lastName age gender about photoUrl";
const User = require('../modals/user');

userRouter.get('/user/requests/received', userAuth, async (req, res) => {
    try {
        const user = req.user;
        const isUser = await User.findOne({ _id: user._id });
        if (!isUser) throw new Error("You are not a original user")
        const data = await ConnectionRequest.findOne({
            fromUserId: user._id,
            status: "interested"
        }).populate("fromUserId", SAFE_USER_PARAMETERS).populate("toUserId", SAFE_USER_PARAMETERS)
        if (!data) throw new Error("No requests found")
        res.json({
            message: "Data fetched",
            data
        })
    } catch (err) {
        res.status(500).send("Internal Server error: " + err.message)
    }
});

userRouter.get('/user/connections', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser?._id, status: "accepted" },
                { toUserId: loggedInUser?._id, status: "accepted" }
            ]
        }).populate("fromUserId", SAFE_USER_PARAMETERS)
            .populate("toUserId", SAFE_USER_PARAMETERS);
        if (connectionRequest.length == 0) throw new Error("No connection requests found");
        const data = connectionRequest.map((row) => {
            if (row?.fromUserId?._id.toString() == loggedInUser?._id.toString()) {
                return row?.toUserId
            }
            return row?.fromUserId
        })
        res.json({
            message: "Fetched",
            data
        })
    } catch (err) {
        res.status(500).send("Internal Server error: " + err.message)
    }
})

userRouter.get('/feed', userAuth , async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const page = req.query.page ||1;
        let limit = req.query.limit || 10;
        limit = limit>50 ? 50 :limit
        const skip = (page-1)*limit;
        
        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser?._id},
                {toUserId:loggedInUser?._id},
            ]
        }).select("fromUserId  toUserId");
        
        const hideUserfromFeed = new Set();
        connectionRequest.forEach((req)=>{
            hideUserfromFeed.add(req.fromUserId?._id.toString());
            hideUserfromFeed.add(req.toUserId?._id.toString());
        })

        const users = await User.find({
            $and:[
                {_id: {$nin:Array.from(hideUserfromFeed)}},
                {_id: {$ne:loggedInUser._id}}
            ]
        }).select(SAFE_USER_PARAMETERS).skip(skip).limit(limit)
        
        res.json({
            message :"Data fetched successully",
            data:users
        })
    
    }catch(err){
        res.status(500).send(err.message)
    }
})

module.exports = userRouter