import e from "express";
import { db } from "./db.mjs";
import { Item } from "./ItemCaptionmodel.mjs";




const listItems = (isLoggedIn) => {
    return new Promise((resolve, reject) => {
        console.log(typeof isLoggedIn, isLoggedIn);
        const limit = isLoggedIn ? 3 : 1;  // Determine the number of items based on the isLoggedIn parameter
        console.log("limit: ", limit)
        console.log("isLoggedIn: ", isLoggedIn)
        const sql = `SELECT * FROM meme ORDER BY RANDOM() LIMIT ${limit}`;  // Use the limit in the SQL query

        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const items = rows.map((e) => {
                return new Item(e.id, e.name, e.cap1, e.cap2);
            });
            resolve(items);
        });
    });
};

export { listItems };