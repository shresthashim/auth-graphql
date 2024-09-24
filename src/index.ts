import express from "express";

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.json({ message: "Hello Hero" });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
