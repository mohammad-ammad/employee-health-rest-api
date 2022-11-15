const EmployeeSlot = require("../models/EmployeeSlot");

exports.updateSlot = async (req, res) => {
    try {
        const _id = req.params.id;
        const slot = await EmployeeSlot.findById({_id, status:"ALLOCATED"});
        if(slot != null)
        {
            const update = await EmployeeSlot.findByIdAndUpdate({_id},{
                $set:{
                    status:"COMPLETE"
                }
            })

            if(update != null)
            {
                res.status(200).json({
                    status:"success",
                    message:"Slot updated successfully"
                })
            }
            else 
            {
                res.status(401).json({
                    status:"failed",
                    message:"Something went wrong"
                })
            }
        }
        else 
        {
            res.status(201).json({
                success:"failed",
                message:"Slot not found"
            })
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}