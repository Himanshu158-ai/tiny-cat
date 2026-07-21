import { ai } from "../config/ai.config.js";

export const generateResponse = async (prompt) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    return response.text;
};