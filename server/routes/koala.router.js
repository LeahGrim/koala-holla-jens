const express = require('express');
const pool = require('../modules/pool')
const koalaRouter = express.Router();

// DB CONNECTION


// GET
koalaRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM koala;';
    pool.query(queryText).then(result => {
        // Sends back the results in an object
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error getting koalas', error);
            res.sendStatus(500);
        });
});

// POST


// PUT
koalaRouter.put('/:koalaId', (req, res) => {
    console.log('koalaId is ', req.params.koalaId);
    console.log('req.body is', req.body);

    let queryText = `
    UPDATE "koala"
    SET "ready_to_transfer" = $1
    WHERE "id" = $2
    `;
    let queryParams = [
        req.body.ready_to_transfer,// $1, 
        req.params.koalaId //$2
    ];
    pool.query(queryText, queryParams)
        .then(() => {
            res.sendStatus(204)
        })
        .catch((err) => {
            console.log('put failed', err);
            res.sendStatus(500);

        })
})

// DELETE

module.exports = koalaRouter;