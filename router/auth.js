const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

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
    }else if(password != cpassword){
      return res.status(422).json({error :"password are not matching"});
    }else{
      const User = new user({name ,email, phone, work,  password, cpassword });
      
      await User.save();
    res.status(201).json({messege:"user Register successfully "})
    }
 
       
      }catch(err){
        console.log(err)
      }
 
    
  });
   // Login Route

   router.post('/signin',async (req,res)=>{
    //  console.log(req.body);
    //  res.json({messege : "awesome"})
     try{
      const {email, password} = req.body;
      
      if(!email || !password) {
        return res.status(400).json({error:"Please Fill The Data "})
      }
      const userLogin = await user.findOne({email:email});
        // console.log(userLogin);
      
        if(userLogin){
         const  isMatch = await  bcrypt.compare(password,userLogin.password)

          if(!isMatch){
            res.json({error : "Invalid Credientials pass"});
          }else{ 
            res.json({message : "user sigin Successfully"}); 
          }
        }else{
          res.status(400).json({error : "Invalid Credientials"})
        }

        
       
     }catch(err) {
          console.log(err);
     } 
    });

module.exports = router;