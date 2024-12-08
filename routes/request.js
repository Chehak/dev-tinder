const express = require('express');
const requestRouter = express.Router();
const User = require('../modals/user');
const ConnectionRequest = require('../modals/connectionRequest');

const { userAuth } = require('../middlewares/adminMiddleware');

requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {

    try {
        const status = req.params.status;
        const user = req.user;
        const toUserId = req.params.toUserId;
        const fromUserId = user._id;
        const allowed_status = ["interested","ignored"];
        if(!allowed_status.includes(status)){
            throw new Error("Status not allowed")
        }        
        const toUser = await User.findById(toUserId);
        if(!toUser) throw new Error("User not found");

        const existingConnectionRequest = await ConnectionRequest.findOne({ $or:[

            {fromUserId, toUserId},{fromUserId:toUserId,toUserId:fromUserId}
        ]
        })


        if(existingConnectionRequest) throw new Error("Request Already Exists")
        
        const connectionRequest = new ConnectionRequest({
            fromUserId,toUserId,status
        })
        const data =  await connectionRequest.save();
        res.json({
            message:user.firstName+", You mark " +toUser.firstName+" as interested",
            data
        })

    }
    catch (err) {
        res.status(500).send("Internal Server error : " + err.message)
    }

})


requestRouter.post('/request/review/:status/:requestId', userAuth , async(req,res)=>{
    //status : accepted or rejected (invalid status)
    //requestId exists
    //already accepted or rejected
    //it must be interested to accept , it must not already sent 
   
    try{
        const loggedInUser = req.user;
        const status = req.params.status
        const requestId = req.params.requestId;
        const allowed_status = ["accepted","rejected"];
        if(!allowed_status.includes(status)) throw new Error("Status is not valid")
        const connectionRequest= await ConnectionRequest.findOne({
            _id:requestId,
            status: "interested",
            toUserId: loggedInUser?._id
        }).populate("fromUserId");
    console.log(connectionRequest,"connectionRequest");
    
    if(!connectionRequest) throw new Error("Connection request not found");

    connectionRequest.status = status;
    const data = await connectionRequest.save();

    res.json({
        message:"You have accepted the connection request of "+connectionRequest.fromUserId.firstName,
        data
    })
        
    }catch(err){
        res.status(400).send("Internal server error: "+err.message)
    }
})

module.exports = requestRouter