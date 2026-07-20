import catModel from "../models/catModel.js";

export const createCats = async (req, res) => {
    try {
        const cat = await catModel.create(req.body);

        return res.status(201).json({
            status: true,
            message: "Cat created successfully",
            cat
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
};