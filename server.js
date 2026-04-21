import express from "express";
import { execSync, exec } from "child_process";

const app = express();

// 🔥 STARTUP PE INSTALL (SAFE)
try {
  execSync("pip3 install yt-dlp --break-system-packages", { stdio: "inherit" });
  console.log("yt-dlp installed");
} catch (e) {
  console.log("yt-dlp install skipped");
}

app.get("/", (req, res) => {
  res.send("Husan Music Backend Running 🎧");
});

app.get("/stream/:id", (req, res) => {
  const videoId = req.params.id;

  exec(`yt-dlp -f bestaudio -g https://youtube.com/watch?v=${videoId}`, (err, stdout) => {
    if (err || !stdout) {
      return res.status(500).json({ error: "yt-dlp failed" });
    }

    res.json({
      streamUrl: stdout.trim()
    });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on " + PORT);
});
