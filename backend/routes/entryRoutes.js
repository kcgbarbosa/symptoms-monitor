import express from 'express';
import { getAllEntries, getEntry, createEntry, updateEntry, deleteEntry } from '../controllers/entryController.js';

const router = express.Router();

// Routes (prefixed with /api/entries)
router.get("/", getAllEntries);
router.get("/:id", getEntry);
router.post("/", createEntry);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);


export default router;
