import express, { Request, Response } from "express";

import dotenv from "dotenv";
import cluster from "cluster";
import os from "os";
import cors from "cors";

import routes from "./routes"

dotenv.config();

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers based on CPU count and available memory
  const maxWorkers = Math.min(numCPUs, os.totalmem() / 2048 / 1024); // Adjust memory calculation as needed
  for (let i = 0; i < maxWorkers; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker: any, code: number, signal: string) => {
    console.error(`worker ${worker.process.pid} died`);

    // Re-fork a new worker to replace the dead one
    cluster.fork();
  });
} else {
  const app = express();
  app.use(express.json());
  app.use(cors({ origin: "*" }));
  app.use("/api", routes); // Use require for routes

  // Define a route
  app.get("/", (req:Request, res:Response) => {
    res.send(`Hello from worker ${process.pid}`);
  });

  const PORT = process.env.PORT || 3000;
  
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started on PORT ${PORT}`);
  });
}
