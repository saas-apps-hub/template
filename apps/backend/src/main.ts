import { sample } from "@template/core";
import express from "express";

const host = process.env.BACKEND_HOST ?? "0.0.0.0";
const port = process.env.BACKEND_PORT ? Number(process.env.BACKEND_PORT) : 8000;

const app = express();

/**
 * Do not remove this endpoint, it is used by the docker healthcheck.
 */
app.get("/health", (_req, res) => {
  res.send({ status: "ok" });
});

app.get("/sample", (_req, res) => {
  res.send({ message: sample() });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
