import express from "express";
import userRoutes from "./routes/UserRoutes.js";
import productRoutes from "./routes/ProductRoutes.js"

const app = express();

app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);

// Root route 
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 404
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