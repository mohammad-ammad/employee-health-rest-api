const EmployeeSlot = require("../models/EmployeeSlot")
const Employee = require('../models/Employee')

exports.create = async (req, res) => {
    try {
        const {name, age} = req.body;
        if(!name || !age)
        {
            throw new Error("All Fields are required");
        }

        const employee = new Employee({
            name,
            age
        })

        const response = await employee.save();

        if(response != null)
        {
            res.status(200).json({
                status:"success",
                message:"Employee created Successful"
            })
        }
        else 
        {
            res.status(201).json({
                status:"failed",
                message:"Something went wrong"
            })
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.bookSlot = async (req, res) => {
    try {
        const {employeeId,venueId,scheduleAt,notes} = req.body;
        if(!employeeId || !venueId || !scheduleAt)
        {
            throw new Error("All Fields are required")
        }
        let date = scheduleAt;

        date = new Date(
            `${date.split('/')[2]}-${date.split('/')[0]}-${date.split('/')[1]}`,
        );

        const slot = new EmployeeSlot({
            employeeId,
            venueId,
            scheduleAt:new Date(date),
            notes
        })

        const response = await slot.save();

        if(response != null)
        {
            res.status(200).json({
                status:"success",
                message:"Slot booked Successfully"
            })
        }
        else 
        {
            res.status(201).json({
                status:"failed",
                message:"Something went wrong"
            })
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.cancelSlot = async (req, res) => {
    try {
        const _id = req.params.id;
        const slot = await EmployeeSlot.findById({_id:_id,status:"ALLOCATED"});
        if(slot != null)
        {
            const cancel = await EmployeeSlot.findByIdAndUpdate({_id},{
                $set:{
                    status:"CANCELLED"
                }
            });

            if(cancel != null)
            {
                res.status(200).json({
                    status:"success",
                    message:"Slot Cancel"
                })
            }
            else
            {
                res.status(201).json({
                    status:"failed",
                    message:"Sorry Can't cancel slot"
                })
            }
        }
        else 
        {
            res.status(201).json({
                status:"failed",
                message:"Sorry Can't cancel slot"
            })
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.SlotList = async (req, res) => {
    try {
        const slot = await EmployeeSlot.find();
        if(slot != null)
        {
            res.status(200).json(slot)
        }
        else 
        {
            res.status(201).json([])
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.redScheduledSlot = async (req, res) => {
    try {
        const _id = req.params.id;
        
        if(!req.body.scheduleAt)
        {
            throw new Error("scheduleAt is required")
        }

        const slot = await EmployeeSlot.findById({_id:_id,status:"ALLOCATED"});
        if(slot != null)
        {
            let date = req.body.scheduleAt;

                date = new Date(
                    `${date.split('/')[2]}-${date.split('/')[0]}-${date.split('/')[1]}`,
                );
            const cancel = await EmployeeSlot.findByIdAndUpdate({_id},{
                $set:{
                    scheduleAt:new Date(date)
                }
            });

            if(cancel != null)
            {
                res.status(200).json({
                    status:"success",
                    message:"Slot updated"
                })
            }
            else
            {
                res.status(201).json({
                    status:"failed",
                    message:"Sorry Can't update slot"
                })
            }
        }
        else 
        {
            res.status(201).json({
                status:"failed",
                message:"Sorry Can't update slot"
            })
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}