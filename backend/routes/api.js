const express = require('express');
const router = express.Router();
const path = require('path');
const { computeImageHash, hammingDistance } = require('../lib/hash');
const { initDatabase } = require('../lib/db');
const upload = require('../lib/upload');

// Initialize DB instance
const db = initDatabase();

// Threshold for similarity (0-60). 
// dHash 64 bits. Threshold 5 means <= 5 bits different.
// Ideally <= 10 is considered similar. Let's start with 5 for strictness or 10 for leniency.
const SIMILARITY_THRESHOLD = 10;

// --- ROUTES ---

// POST /api/register-consent
router.post('/register-consent', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file uploaded' });
        }

        const { policy, notes } = req.body;
        if (!policy) {
            return res.status(400).json({ error: 'Policy is required' });
        }

        const imagePath = req.file.path;
        const hash = await computeImageHash(imagePath);
        const timestamp = new Date().toISOString();

        // Prepare info
        const newRecord = {
            image_hash: hash,
            policy: policy, // 'AI_ALLOWED', 'AI_RESTRICTED', 'PLATFORM_ONLY'
            notes: notes || '',
            created_at: timestamp,
            status: 'active'
        };

        // Insert into DB
        const stmt = db.prepare(`
            INSERT INTO consent_registry (image_hash, policy, notes, created_at, status)
            VALUES (@image_hash, @policy, @notes, @created_at, @status)
        `);

        const info = stmt.run(newRecord);

        // Return success
        res.json({
            success: true,
            consent_id: info.lastInsertRowid,
            image_hash: hash,
            policy: policy,
            timestamp: timestamp
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/verify-image
router.post('/verify-image', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file uploaded' });
        }

        const imagePath = req.file.path;
        const candidateHash = await computeImageHash(imagePath);

        // Basic linear scan for MVP. 
        const stmt = db.prepare("SELECT * FROM consent_registry WHERE status = 'active'");
        const allRecords = stmt.all();

        let bestMatch = null;
        let minDistance = 65; // Max possible is 64

        for (const record of allRecords) {
            const dist = hammingDistance(candidateHash, record.image_hash);
            if (dist < minDistance) {
                minDistance = dist;
                bestMatch = record;
            }
        }

        if (bestMatch && minDistance <= SIMILARITY_THRESHOLD) {
            // Calculate confidence (inverse of distance)
            const confidence = ((64 - minDistance) / 64) * 100;

            res.json({
                result: bestMatch.policy === 'AI_RESTRICTED' ? 'AI_RESTRICTED' : bestMatch.policy === 'PLATFORM_ONLY' ? 'PLATFORM_ONLY' : 'ALLOWED',
                result_raw: bestMatch.policy,
                match: true,
                record: bestMatch,
                confidence: parseFloat(confidence.toFixed(1)),
                policy: bestMatch.policy,
                matched_policy: bestMatch.policy,
                matched_at: bestMatch.created_at
            });
        } else {
            res.json({
                result: 'NO_RECORD',
                match: false,
                confidence: 0,
                policy: 'NO_RECORD',
                matched_policy: null,
                matched_at: null
            });
        }

    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/registry
router.get('/registry', (req, res) => {
    try {
        const stmt = db.prepare("SELECT * FROM consent_registry WHERE status = 'active' ORDER BY created_at DESC");
        const rows = stmt.all();
        res.json(rows);
    } catch (error) {
        console.error('Registry error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
