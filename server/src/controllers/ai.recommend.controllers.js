import catModel from "../models/catModel.js";
import { generateResponse } from "../services/gemini.service.js";

export const aiRecommend = async (req, res) => {
    try {
        const { kidsFriendly = false, apartmentFriendly = false } = req.body;

        const matchFromDB = await catModel.find({ kidsFriendly, apartmentFriendly });

        if (!matchFromDB) {
            return res.status(200).json({
                status: true,
                message: "Data not fond on the bases of filter"
            })
        }

        const prompt = `
    You are a cat breed recommendation expert.

The user has requested a cat with these preferences:
- Kids Friendly: ${kidsFriendly}
- Apartment Friendly: ${apartmentFriendly}

Here are the matching cat breeds:
${matchFromDB}

Your task:
1. Select the single best cat breed for the user.
2. Explain why it is the best choice based on the user's preferences.
3. Mention 2-3 strengths of the recommended breed.
4. Mention any small drawbacks or things the user should know.
5. Briefly compare it with the other matching breeds and explain why they were not selected.
6. Keep the response concise, friendly, and easy to understand.
7. Use only the data provided. Do not make up facts.

Return the response in Markdown using this format:

# 🐱 Best Recommendation

## Breed
<Breed Name>

## Why this breed?
<Short explanation>

## Strengths
- ...
- ...
- ...

## Things to Know
- ...
- ...

## Why not the others?
- Breed A: ...
- Breed B: ...
- ...

## Final Verdict
<1-2 sentence conclusion>
    `

        const data = await generateResponse(prompt);

        return res.status(200).json({
            status: true,
            message: "Recommended by AI",
            data
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }

}