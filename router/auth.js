const express = require('express');
const router = express.Router();

require('../db/conn');
const user = require("../model/userSchema");

router.get('/', async (req, res) => {
    res.send(`Hello world from the server rotuer js`);
});
 // Using promises 
// router.post('/register', (req, res) => {
//          // call all objects in one line 
//     const {name ,email,  phone, work,  password, cpassword } = req.body;

//     if(!name ||!email|| !phone || !work|| !password || !cpassword){
//         return res.status(422).json({error :"Pleases Fill The Field Properly"});
//     }
//      user.findOne({email:email}).then((userExist)=>{
//           if(userExist){
//             return res.status(422).json({error :"Email Alredy Exits"}); 
//           }

//           const User = new user({name ,email,  phone, work,  password, cpassword });
//           User.save().then(()=>{
//              res.status(201).json({messege:"user Register successfully "})      
//         }).catch((err) =>{res.status(500).json({error:"Fail To Registered"})})

//      }).catch((err) =>{console.log(err); })
     
// });
 // ===================================================

  router.post('/register',async (req, res) => {
           // call all objects in one line 
      const {name ,email,  phone, work,  password, cpassword } = req.body;
  
      if(!name ||!email|| !phone || !work|| !password || !cpassword){
          return res.status(422).json({error :"Pleases Fill The Field Properly"});
      }
      try{
    const userExist =   await  user.findOne({email:email});
    if(userExist){
      return res.status(422).json({error :"Email Alredy Exits"}); 
    }
    const User = new user({name ,email, phone, work,  password, cpassword });
     
         await User.save();

  res.status(201).json({messege:"user Register successfully "})
       
      }catch(err){
        console.log(err)
      }





      
       
  });
  

module.exports = router;