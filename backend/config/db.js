import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

// Neon Connection
export const sql = neon(process.env.DATABASE_URL);