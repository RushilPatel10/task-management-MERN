import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./src/db/connect.js";
import cookieParser from "cookie-parser";
import fs from "node:fs";
import errorHandler from "./src/helpers/errorhandler.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

// middleware
app.use(
  cors({
    origin: ['https://task-management-mern-frontend.onrender.com', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// error handler middleware
app.use(errorHandler);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Load routes
const routesPath = join(__dirname, 'src', 'routes');
try {
  const routeFiles = fs.readdirSync(routesPath);
  
  for (const file of routeFiles) {
    if (file.endsWith('.js')) {
      const route = await import(`./src/routes/${file}`);
      app.use("/api/v1", route.default);
      console.log(`Loaded route: ${file}`);
    }
  }
} catch (error) {
  console.error('Error loading routes:', error);
}

// 404 handler
app.use((req, res) => {
  console.log(`404 - Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    message: 'Endpoint not found',
    requestedUrl: req.originalUrl,
    method: req.method
  });
});

const server = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Failed to start server.....", error.message);
    process.exit(1);
  }
};

server();
