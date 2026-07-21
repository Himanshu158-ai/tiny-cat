import { generateResponse } from "../services/gemini.service.js";

export const askAi = async (req, res) => {
    try {
        const { prompt } = req.body;
        const data = await generateResponse(prompt);
        return res.status(200).json({
            status: true,
            message: "Ai response",
            data
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        })
    }
}  