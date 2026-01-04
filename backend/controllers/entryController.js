import { sql } from "../config/db.js";

// @desc Get all entries
// @route GET / 
export const getAllEntries = async (req, res) => {
    try {
        const entries = await sql`
            SELECT 
                id,
                symptom_name,
                icon_name,
                severity,
                notes,
                date_of_symptom::text as date_of_symptom,
                created_at
            FROM entries
            ORDER BY created_at DESC
        `;
        console.log("fetched all entries", entries);
        res.status(200).json({ success: true, data: entries });
    } catch (error) {
        console.log("Error getAllEntries", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// @desc Create new entry
// @route POST / 
export const createEntry = async (req, res) => {
    const { symptom_name, icon_name, severity, date_of_symptom, notes } = req.body;

    if (!symptom_name || !severity || !date_of_symptom) {
        return res.status(400).json({ success: false, message: "Please fill out all required fields!" });
    }
    try {
        const newEntry = await sql`
            INSERT INTO entries (symptom_name,icon_name,severity,date_of_symptom,notes)
            VALUES (${symptom_name},${icon_name ?? 'DefaultIcon'},${severity},${date_of_symptom},${notes})
            RETURNING *
        `;
        console.log("new entry added:", newEntry[0]);

        res.status(201).json({ success: true, data: newEntry });

    } catch (error) {
        console.log("Error in createEntry function", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// @desc Get single entry
// @route GET / :id
export const getEntry = async (req, res) => {
    const { id } = req.params

    try {
        const entry = await sql`
            SELECT 
                id,
                symptom_name,
                icon_name,
                severity,
                notes,
                date_of_symptom::text as date_of_symptom,
                created_at
            FROM entries 
            WHERE id=${id}
        `;

        res.status(200).json({ success: true, data: entry[0] });
    } catch (error) {
        console.log("Error in getEntry function", error)
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// @desc Update existing entry 
// @route PUT / :id
export const updateEntry = async (req, res) => {
    const { id } = req.params;
    const { symptom_name, icon_name, severity, date_of_symptom, notes } = req.body;

    try {
        const updateEntry = await sql`
            UPDATE entries
            SET symptom_name=${symptom_name}, icon_name=${icon_name ?? 'DefaultIcon'}, severity=${severity}, date_of_symptom=${date_of_symptom}, notes=${notes}
            WHERE id=${id}
            RETURNING id, symptom_name, icon_name, severity, notes, date_of_symptom::text as date_of_symptom, created_at
        `;

        if (updateEntry.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Entry not found",
            });
        }

        res.status(200).json({ success: true, data: updateEntry[0] })
    } catch (error) {
        console.log("Error in updateEntry function", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
// @desc Delete existing entry 
// @route DELETE / :id
export const deleteEntry = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEntry = await sql`
            DELETE FROM entries 
            WHERE id=${id}
            RETURNING *
        `;

        if (deletedEntry.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Entry not found",
            });
        }

        res.status(200).json({ success: true, data: deletedEntry[0] })
    } catch (error) {
        console.log("Error in deleteEntry function", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};