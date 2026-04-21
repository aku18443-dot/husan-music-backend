import express from "express";
import { exec } from "child_process";

const app = express();

app.get("/", (req, res) => {
  res.send("Husan Music Backend Running 🎧");
});

app.get("/stream/:id", (req, res) => {
  const videoId = req.params.id;

  const url = `https://www.youtube.com/watch?v=${videoId}`;

  exec(`yt-dlp -f bestaudio -g ${url}`, (err, stdout, stderr) => {
    if (err || !stdout) {
      console.error(stderr);
      return res.status(500).json({ error: "yt-dlp failed" });
    }

    res.json({
      streamUrl: stdout.trim()
    });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
