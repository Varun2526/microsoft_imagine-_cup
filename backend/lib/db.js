const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

function initDatabase() {
    const dbPath = path.join(__dirname, '../../database/registry.db');
    const dbDir = path.dirname(dbPath);

    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
    }

    const db = new Database(dbPath, { verbose: console.log });

    // Create table
    const createTable = `
        CREATE TABLE IF NOT EXISTS consent_registry (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image_hash TEXT NOT NULL,
            policy TEXT NOT NULL CHECK(policy IN ('AI_ALLOWED', 'AI_RESTRICTED', 'PLATFORM_ONLY')),
            notes TEXT,
            created_at TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'superseded', 'deleted'))
        );
    `;

    db.exec(createTable);
    console.log('Database initialized at ' + dbPath);
    return db;
}

module.exports = { initDatabase };
