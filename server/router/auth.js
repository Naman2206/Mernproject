const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require('../db/conn');
const User=require('../model/userSchema');

router.get('/', (req, res) => {
    res.send(`Hello world from the server rotuer js`);
});


// router.post('/register', (req, res) => {

//     const { name, email, phone, work, password, cpassword} = req.body;
    
//     if (!name || !email || !phone 
//         ||!work || !password || !cpassword) {
//          return res.status(422).json({ error: "Plz filled the field properly" });
//         }
    
// User.findOne({ email: email })
// .then((userExist) => { return res.status(422).json({ error: "Email already Exist" });

// if (userExist){
//     return res.status(422).json({error:"Email already exist"})
// }
// const user = new User({ name, email, phone, work, password, cpassword });
// user.save().then(() => {
//     res.status(201).json({error:"Failed to register"});
//     })

//  })
// });



router.post('/register', async(req, res) => {

    const { name, email, phone, work, password, cpassword} = req.body;
    
    if (!name || !email || !phone 
        ||!work || !password || !cpassword) {
         return res.status(422).json({ error: "Plz filled the field properly" });
        }
 
 try{
  const userExist= await User.findOne({ email: email })
  if (userExist){
    return res.status(422).json({error:"Email already exist"});
   }
   else if (password != cpassword) {

    return res.status(422).json({ error: "password are not matching" });}
   else{
    const user = new User({ name, email, phone, work, password, cpassword });
const userRegister=await user.save();
if(userRegister){
    res.status(201).json({error:"user Register susscesfully"}); 
}else{
    res.status(500).json({error:"user Failed to Register"});
}

 }  

}catch(err) {console.log(err)};

});

router.post('/signin',async(req,res)=> {
try{
const {email,password}=req.body;
if(!email||!password){
    return res.status(400).json({error:"plzz fill the data"})
}
const userLogin=await User.findOne({email:email});
// console.log(userLogin);
if(userLogin){
    const isMatch = await bcrypt.compare(password,userLogin.password);
    const token = await userLogin.generateAuthToken();
    console.log(token);

    res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

    if(!isMatch){
        res.status(400).json({ error: "invalid details"});
    }else{
        res.json({message:"user Login succsesfully"}); 
    }
    
    }else{
        res.status(422).json({ error: "invalid details"});
    }
}
catch(err){
console.log(err)
}

});







module.exports = router;
