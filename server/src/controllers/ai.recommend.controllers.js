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
${JSON.stringify(matchFromDB, null, 2)}

Instructions:
1. Analyze all the provided cat breeds.
2. If there are multiple matching breeds:
   - Recommend the single best breed.
   - Explain why it is the best choice.
   - Compare it briefly with the other matching breeds.
3. If there is only ONE matching breed:
   - Recommend that breed directly.
   - Do NOT include a "Why not the others?" section.
   - Focus on why this breed is a good match for the user's preferences.
4. Mention 2-3 key strengths.
5. Mention any important things the user should know (energy level, grooming, lifespan, etc.).
6. Keep the response concise, friendly, and easy to understand.
7. Use ONLY the provided data. Never make up facts or compare with breeds that are not in the provided data.

Return the response in Markdown.

For multiple breeds:

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

## Final Verdict
<1-2 sentence conclusion>

If only one breed is provided, return:

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

## Final Verdict
<1-2 sentence conclusion>
`;

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