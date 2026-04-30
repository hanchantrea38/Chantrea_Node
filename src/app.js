import express from "express";
import userRoutes from "./routes/UserRoutes.js";

const app = express();

// Middleware
app.use(express.json());

// Routes (better prefix)
app.use("/users", userRoutes);

// Root route (optional but useful)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler (important)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:3000`);
});