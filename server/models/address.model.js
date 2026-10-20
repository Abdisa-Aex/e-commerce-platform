import mongoose from "mongoose";
import User from "./Users.model";
const addressSchema=new mongoose.Schema({
    address_line:{
        type:String,
        default:""
    },
    city:{
        type:String,
        default:""
    },
    state:{
        type:String,
        default:""
    },
    pincode:{
        type:String       
    },
   country:{
        type:String
    },
   mobile:{
        type:Number,
        default:null
    },
    status:{
        type:mongoose.Schema.ObjectId,
        default:true
    },
   UserId:{
        type:String,
        default:""
    },
},{ timestamps:true})
const AddressModel=mongoose.model('address',addressSchema)
export default AddressModel