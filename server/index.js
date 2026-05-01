import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import { prompts } from "./prompts.js";

app.post("/chat", async (req, res) => {
  const { message, persona } = req.body;

  const systemPrompt = prompts[persona];

  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/chat/completions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.MODEL,
          temperature: 0.7,
          max_tokens: parseInt(process.env.MAX_TOKENS || "400"),
          messages: [
            {
              role: "system",
              content: systemPrompt + "\n\nStay strictly in character. Do not break persona."
            },
            {
              role: "user",
              content: message
            }
          ]
        }),
      },
    );

    const data = await response.json();

    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      const apiError = data.error?.message || "No response from AI. Please try again.";
      return res.status(502).json({ error: apiError });
    }

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});
