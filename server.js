import express from "express";
import { exec } from "child_process";

const app = express();

app.get("/", (req, res) => {
  res.send("Husan Music Backend Running 🎧");
});

app.get("/stream/:id", (req, res) => {
  const id = req.params.id;
  exec(`yt-dlp -f bestaudio -g https://youtube.com/watch?v=${id}`, (err, stdout) => {
    if (err || !stdout) return res.status(500).json({ error: "yt-dlp failed" });
    res.json({ streamUrl: stdout.trim() });
  });
});

// 👇 IMPORTANT
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on " + PORT);
});
