import express from 'express';
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import entryRoutes from './routes/entryRoutes.js';
import { sql } from './config/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

// Routes 
app.use("/api/entries", entryRoutes);

// Database Initialization
async function initDB() {
    try {
        // Schema initialization for the entries table
        await sql`
            CREATE TABLE IF NOT EXISTS entries (
                id SERIAL PRIMARY KEY,
                symptom_name VARCHAR(255) NOT NULL,
                icon_name VARCHAR(255) DEFAULT 'DefaultIcon',
                severity INTEGER NOT NULL CHECK (severity >= 1 AND severity <= 10),
                notes TEXT,
                date_of_symptom DATE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        console.log("Database initialized successfully");
    } catch (error) {
        console.error("Critical Error: Database initialization failed", error);
    }
}

// Server Startup 
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});