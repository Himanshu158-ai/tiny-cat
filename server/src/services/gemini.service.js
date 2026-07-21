import { ai } from "../config/ai.config.js";

export const generateResponse = async (body) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: body,
    });

    return response.text;
};