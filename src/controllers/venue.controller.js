const Venue = require("../models/Venue");

exports.create = async (req, res) => {
    try {
        const {name, location} = req.body;
        if(!name || !location)
        {
            throw new Error("All fields are required")
        }

        const venue = new Venue({
            name,
            location
        })

        const response = await venue.save();

        if(response)
        {
            res.status(200).json({
                status:"success",
                message:"Venue created successfully"
            })
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.remove = async (req, res) => {
    try {
        const _id = req.params.id;
        const response = await Venue.findByIdAndRemove({_id});
        if(response)
        {
            res.status(200).json({
                status:"success",
                message:"Venue deleted successfully"
            })
        }
        else 
        {
            res.status(201).json({
                status:"failed",
                message:"Venue not found"
            }) 
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.venueList = async (req, res) => {
    try {
        const venue = await Venue.find();
        if(venue != null)
        {
            res.status(200).json(venue)
        }
        else 
        {
            res.status(201).json([])
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}