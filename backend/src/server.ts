import dotenv from "dotenv";

dotenv.config();

import http from "http";

import app from "./app";

import { connectDB } from "./config/db";

const PORT = process.env.PORT || 5000;

const start = async () => {

  await connectDB();

  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
};

start();