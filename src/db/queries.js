import {pool} from "./pool.js";

export async function getMessages() {
    const messages = await pool.query(`
        SELECT m.id, m.title, m.text, m.timestamp, u.firstname, u.lastname
        FROM messages m
        JOIN users u ON m.userid = u.id
    `);
    return messages.rows;
}