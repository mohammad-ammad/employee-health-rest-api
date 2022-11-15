const mongoose = require("mongoose")

const EmployeeSlotSchema = new mongoose.Schema({
    employeeId:{type: mongoose.Schema.Types.ObjectId, ref:'Employee'},  
    venueId:{type: mongoose.Schema.Types.ObjectId, ref:'Venue'},
    scheduleAt:{
        type: Date,
        required: true
    },
    status:{
        type:String,
        default:"ALLOCATED"
    },
    notes:{
        type:String,
        default:""
    } 
},{timestamps:true})

module.exports = mongoose.model('EmployeeSlot',EmployeeSlotSchema);