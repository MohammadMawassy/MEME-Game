import { db } from "./db.mjs";

const getRelatedCaptionsForItem = (itemId) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT id, text
            FROM captions
            WHERE id IN (
                SELECT cap1 FROM meme WHERE id = ?
                UNION
                SELECT cap2 FROM meme WHERE id = ?
            )
        `;

        db.all(sql, [itemId, itemId], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }

            const captions = rows.map(c => ({ id: c.id, text: c.text }));
            resolve(captions);
        });
    });
};

const getRandomCaptionsExcluding = (excludeIds) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT id, text
            FROM captions
            WHERE id NOT IN (${excludeIds.join(',')})
            ORDER BY RANDOM()
            LIMIT 5
        `;

        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }

            const captions = rows.map(c => ({ id: c.id, text: c.text }));
            resolve(captions);
        });
    });
};

export { getRelatedCaptionsForItem, getRandomCaptionsExcluding };