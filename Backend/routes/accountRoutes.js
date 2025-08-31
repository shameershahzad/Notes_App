const express = require("express")
const accountModel = require("../Model/accountModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const router = express.Router()


router.post("/signUp",async(req,res) => {
 const {name,email,password} = req.body;

 try{
    const checkEmail = await accountModel.findOne({email})

    if(checkEmail){
         return res.status(404).json({message:"Email already exist"})
    }
    const hashPassword = await bcrypt.hash(password,10)

    const user = await accountModel.create({name:req.body.name,email:req.body.email,password:hashPassword})

    return res.status(200).json({result:user,message:"SignUp successfully!"})
 }catch(err){
    return res.status(500).json({error:err.message})
 }

})

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await accountModel.findOne({email});

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id }, "Your Secret Key", { expiresIn: "1h" });

    res.status(200).json({ message: "Success", token});
  } catch (err) {
    console.error(err);
   return res.status(500).json({ message: "Server error" });
  }
});

router.post("/verifyEmail",async(req,res) => {
    const {email} = req.body;
try{
    const foundEmail = await accountModel.findOne({email})
    if(!foundEmail){
        return res.status(400).json({message:"Email doesn't exist"})
    }
    return res.status(200).json({message:"Email found"})

}catch(err){
    return res.status(500).json({error:err.message})
}
})

router.put("/updatePassword/:email",async(req,res) => {
    const {newPassword} = req.body;
    try{
        const hashPassword = await bcrypt.hash(newPassword,10)
    
         const updatePass = await accountModel.updateOne({email:req.params.email},{$set:{password:hashPassword}});
         if(updatePass){
            return res.status(200).json({message:"Password updated"})
         }
    }catch(err){
            return res.status(500).json({error:err})
    }
})


module.exports = router