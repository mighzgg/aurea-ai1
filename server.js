import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: req.body.message
      })
    });

    const data = await response.json();
    const text = data.output_text || "Sem resposta";
    res.json({ reply: text });

  } catch (e) {
    res.json({ reply: "Erro: " + e.message });
  }
});

app.listen(3000, () => console.log("Backend rodando"));
