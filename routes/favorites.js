const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //Get all the favorited maps - Works! Will need to modify once we have all the ids
  router.get('/', (req, res) => {
    const userID = req.session.user_id;
    const query = `
    SELECT DISTINCT maps.* FROM maps
    JOIN favorites ON maps.id = map_id
    WHERE favorites.user_id = $1
    ORDER BY maps.date_created;
    `;

    return db.query(query, [userID])
      .then(data => res.json(data.rows))
      .catch(e => e);
  });

  //Favorite a map -- Will develop this further once favorites functionality has been setup
  router.post('/', (req, res) => {
    const mapID = req.body.mapID;
    const userID = req.session.user_id;
    const query =`
    INSERT INTO favorites (user_id, map_id)
    VALUES ($1, $2)
    RETURNING *;
    `;

    return db.query(query, [userID, mapID])
      .then(data => res.json(data))
      .catch(e => e);
  });

  return router;
};
