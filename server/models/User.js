// import mongoose from "mongoose";
// import bcrypt from 'bcrypt'

// const UserSchema = new mongoose.Schema({
//     name:{
//         type:String ,
//         required:true

//     },
//     email:{
//          type:String ,
//         required:true,
//         unique:true

//     },
//     password:
//     {
//          type:String ,
//         required:true
  
//     },

//     })

//    UserSchema.methods.comparePassword = function (password) {
//    return bcrypt.compare(password, this.password);
//     }

//     const User = mongoose.model("User" , UserSchema)

//     export default User;

// import mongoose from "mongoose";
// import bcrypt from "bcrypt";

// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },

//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },

//   password: {
//     type: String,
//     required: true
//   }
// });

// UserSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// const User = mongoose.model("User", UserSchema);

// export default User;

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compare password method
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// IMPORTANT
const User = mongoose.model("User", userSchema);

export default User;