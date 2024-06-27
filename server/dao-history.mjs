import { db } from "./db.mjs";

const createHistory = (history) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO histories (user, date, score, item, GameScore) VALUES(?, ?, ?, ?, ?)';
      db.run(sql, [ history.user, history.date, history.score, history.meme, history.totalScore], function (err) {
        if (err) {
          reject(err);
        }
        resolve(null);
      });
    })
};


const getUserHistory = (user) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM histories WHERE user = ? ORDER BY date DESC';
      db.all(sql, [user], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const history = rows.map(row => ({
            date: row.date,
            score: row.score,
            meme: row.item.name,
            GameScore: row.GameScore
          }));
          resolve(history);
        }
      })
    })
}

export { createHistory, getUserHistory}