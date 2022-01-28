const mongooose = require('mongoose');
 const bcrypt = require('bcryptjs');
const userSchema = new mongooose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
         type: String,
        required:true
    },
    phone: {
        type: Number,
        required:true
    },
    work: {
         type: String,
        required:true
    },
    password: {
         type: String,
        required:true
    },
    cpassword: {
         type: String,
        required:true
    }
})



// we are  hashing  the password
userSchema.pre('save', async function(next){
 
   if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword =  await bcrypt.hash(this.password,12);
   }
   next();
});
  // collection creation 
const User = mongooose.model('USER', userSchema);

module.exports = User;