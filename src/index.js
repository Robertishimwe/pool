const express = require("express");
const dotenv = require("dotenv");
const cluster = require("cluster");
const os = require("os");
const cors = require("cors");

dotenv.config();

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers based on CPU count and available memory
  const maxWorkers = Math.min(numCPUs, os.totalmem() / 2048 / 1024); // Adjust memory calculation as needed
  for (let i = 0; i < maxWorkers; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(`worker ${worker.process.pid} died`);

    // Re-fork a new worker to replace the dead one
    cluster.fork();
  });
} else {
  const app = express();
  app.use(express.json());
  app.use(cors({ origin: "*" }));
//   app.use("/api", require("./routes/index")); // Use require for routes

  // Define a route
  app.get("/", (req, res) => {
    res.send(`Hello from worker ${process.pid}`);
  });

  const PORT = process.env.PORT || 3000;
  
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started on PORT ${PORT}`);
  });
}
