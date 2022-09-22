const mongoose = require('mongoose');


let vmdetails = mongoose.Schema(
    {
        VmId : Number,  
        VmName : String,  
        VmType : String,  
        VmLocation : String
    }
)

const vm = mongoose.model("vmdetails",vmdetails,"vmdetails");

module.exports=vm;