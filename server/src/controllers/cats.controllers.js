import catModel from "../models/catModel.js";
import mongoose from 'mongoose'

export const createCat = async (req, res) => {
    try {
        const cat = await catModel.create(req.body);

        return res.status(201).json({
            status: true,
            message: "Cat created successfully",
            data: cat
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

export const getAllCats = async (req, res) => {
    try {
        const cats = await catModel.find().sort({ createdAt: -1 });
        return res.status(200).json({
            status: true,
            message: "Fetched all cats",
            data: cats
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};

export const getCat = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: "Invalid Cat ID"
            });
        }

        const cat = await catModel.findById(id);

        if (!cat) {
            return res.status(404).json({
                status: false,
                message: "Cat not found",
                data: cat
            })
        }

        return res.status(200).json({
            status: true,
            message: "Fetched Successfully",
            cat
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

export const recommendCat = async (req, res) => {

    try {
        const { kidsFriendly, apartmentFriendly } = req.body;
        const cats = await catModel.find({
            kidsFriendly,
            apartmentFriendly
        })
        res.status(200).json({
            status: true,
            message: "Recommended cats",
            data: cats,
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}