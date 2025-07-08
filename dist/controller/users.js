"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pool = require("../db");
exports.getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM vendors');
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
