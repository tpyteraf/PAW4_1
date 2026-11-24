"use strict";

const express = require("express");
const app = express();

// define endpoint for exercise 1 here
app.get("/math/circle/:r", (req, res) => {
  const r = Number(req.params.r);
  const area = Math.PI * r * r;
  const circumference = 2 * Math.PI * r;

  if (!Number.isFinite(r) || r < 0) {
    return res.status(400).json({ error: "Promień musi być liczbą nieujemną" });
  }

  const result = {
    area: area.toPrecision(2),
    circumference: circumference.toPrecision(2),
  };

  res.json(result);
});

//TODO2

//TODO3

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
