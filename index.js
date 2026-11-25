"use strict";

const { mean, geometricMean, harmonicMean } = require("simple-statistics");
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
    area: Number(area.toFixed(2)),
    circumference: Number(circumference.toFixed(2)),
  };

  res.json(result);
});

app.get("/math/rectangle/:width/:height", (req, res) => {
  const width = Number(req.params.width);
  const height = Number(req.params.height);

  if (
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width < 0 ||
    height < 0
  ) {
    return res
      .status(400)
      .json({ error: "Szerokość i wysokość muszą być liczbami nieujemnymi" });
  }

  const area = width * height;
  const perimeter = 2 * (width + height);

  const result = {
    area: Number(area.toFixed(2)),
    perimeter: Number(perimeter.toFixed(2)),
  };

  res.json(result);
});

app.get("/math/power/:base/:exponent", (req, res) => {
  const base = Number(req.params.base);
  const exponent = Number(req.params.exponent);
  const root = req.query.root === "true";

  if (!Number.isFinite(base) || !Number.isFinite(exponent)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const result = Math.pow(base, exponent);

  if (root) {
    const root = Math.sqrt(base);
    return res.json({
      result: Number(result.toFixed(2)),
      root: Number(root.toFixed(2)),
    });
  }

  res.json({ result: Number(result.toFixed(2)) });
});

app.get("/math/isprime/:n", (req, res) => {
  const n = Number(req.params.n);

  if (!Number.isSafeInteger(n) || n < 2) {
    return res.status(400).json({ error: "Invalid input" });
  }

  let isPrime = true;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      isPrime = false;
      break;
    }
  }

  res.json({ number: n, isPrime });
});

app.get("/math/gcdlcm/:a/:b", (req, res) => {
  let a = Math.abs(Number(req.params.a));
  let b = Math.abs(Number(req.params.b));

  if (!Number.isSafeInteger(a) || !Number.isSafeInteger(b)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  if (a === 0 && b === 0) {
    return res.json({ gcd: 0, lcm: 0 });
  }

  if (a === 0 || b === 0) {
    return res.json({ gcd: Math.max(a, b), lcm: 0 });
  }

  let gcd = a;
  let lcm = a * b;
  while (b !== 0) {
    gcd = b;
    b = a % b;
    a = gcd;
  }

  lcm = Math.abs(lcm) / gcd;

  res.json({ gcd, lcm });
});

app.get("/math/average", (req, res) => {
  const numbers = req.query.nums.split(",").map(Number);

  if (
    numbers.some((n) => !Number.isFinite(n)) ||
    numbers.length === 0 ||
    numbers.some((n) => n <= 0)
  ) {
    return res.status(400).json({ error: "Invalid input" });
  }

  res.json({
    arithmeticMean: mean(numbers),
    geometricMean: geometricMean(numbers),
    harmonicMean: harmonicMean(numbers),
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
