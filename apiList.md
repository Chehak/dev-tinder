# DevTinder Api's

 ## authRoute
 - POST /signup
 - POST /login
 - POST /logout

 ## profileRouter
 - GET /profile/view
 - PATCH /profile/edit
 - PATCH /profile/password

 ## connectionRequestRouter 
 - POST /request/send/interested/:userId
 - POST /reuest/send/ignored/:userId
 - POST /request/review/accepted/:requestId
 - POST /request/review/rejected/:requestId

 ## userRouter
 - POST /user/feed - - Gets you the profiles of other users on platform
 - POST /user/connections
 - POST /user/requests



app.get("/user",async(req,res)=>{
  const emailId = req.body.email;
  try{
    const user = await User.findOne({email:emailId});
    if(user) res.send(user);
    res.status(400).send("User not found")
  }catch(err){
    res.status(500).send("Internal Server error")
  }
})

app.get("/users",async(req,res)=>{
  try{
    const users = await User.find({});
    res.send(users)
  }catch(err){
    res.status(500).send("Internal server error")
  }
})

app.delete('/user',async(req,res)=>{
  try{
   await User.findByIdAndDelete(req.body.id);
    res.send("User deleted");
  }catch(err){
    res.status(500).send("Internal server error")
  } 
})

app.get('/userById',async(req,res)=>{
  // findOne({_id:id}) is equivalent to findById(id)
  try{
    const user = await User.findOne({_id:req.body.id});
    res.send(user)
  }catch(err){
    res.status(500).send("Internal Server error")
  }
})

app.patch('/user/:userId', async(req,res)=>{
  const userId = req.params.userId;
  const toBeUpdated = req.body;
  try{
    const allowed_updates = ["firstName","lastName","age","gender","skills"];
    const isUpdateAllowed = Object.keys(toBeUpdated).every((k)=>allowed_updates.includes(k));
    if(!isUpdateAllowed) throw new Error("Update not allowed");
    if(toBeUpdated.skills.length>10) throw new Error("Not more than 10 skills are allowed")
    const user = await User.findByIdAndUpdate(userId,toBeUpdated , {returnDocument:'before',lean:true, runValidators: true,});
    res.send("Updated successfully")
    
  }catch(err){
    res.status(500).send("Internal server error"+err)
  }
})

app.patch('/userByEmail', async(req,res)=>{
  const toBeUpdated = req.body;
  try{
    const user = await User.findOneAndUpdate({email:req.body.email} , toBeUpdated);
    res.send("Updated")
  }catch(err){
    res.status(500).send("Internal server error"+err)

  }
})


app.post('/sendConnectionRequest',userAuth ,async(req,res)=>{
  try{
    const user = req.user
    if(user){
      res.send(user.firstName + " "+ "send connection request")
    }
  }
  catch(err){
    res.status(500).send("Internal Server error"+ err.message)
  }

})
