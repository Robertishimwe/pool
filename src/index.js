"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const numCPUs = os_1.default.cpus().length;
if (cluster_1.default.isPrimary) {
    console.log(`Master ${process.pid} is running`);
    // Fork workers based on CPU count and available memory
    const maxWorkers = Math.min(numCPUs, os_1.default.totalmem() / 2048 / 1024); // Adjust memory calculation as needed
    for (let i = 0; i < maxWorkers; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("exit", (worker, code, signal) => {
        console.error(`worker ${worker.process.pid} died`);
        // Re-fork a new worker to replace the dead one
        cluster_1.default.fork();
    });
}
else {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)({ origin: "*" }));
    app.use("/api", routes_1.default); // Use require for routes
    // Define a route
    app.get("/", (req, res) => {
        res.send(`Hello from worker ${process.pid}`);
    });
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} started on PORT ${PORT}`);
    });
}
