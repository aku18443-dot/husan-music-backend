import express from "express";
import { exec } from "child_process";

const app = express();

app.get("/stream/:id", (req, res) => {
  exec(`yt-dlp -f bestaudio -g https://youtube.com/watch?v=${req.params.id}`, (e, out) => {
    if (e) return res.send("error");
    res.json({ url: out.trim() });
  });
});

app.listen(3000);