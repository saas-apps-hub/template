import express from "express";

const host = process.env.BACKEND_HOST ?? "localhost";
const port = process.env.BACKEND_PORT ? Number(process.env.BACKEND_PORT) : 8000;

const app = express();

app.get("/", (_req, res) => {
  res.send({ message: "Hello API" });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
