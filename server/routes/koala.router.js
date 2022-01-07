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
koalaRouter.post('/', (req, res) => {
    //let newKoala = req.body;
    console.log('new koala to be added ', req.body);
    let queryText= ` INSERT INTO "koala" ("name", "gender", "age", "ready_to_transfer", "notes")
                     VALUES ($1, $2, $3, $4, $5);`
    let queryParams= [
        req.body.name, 
        req.body.gender, 
        req.body.age, 
        req.body.readyForTransfer, 
        req.body.notes,
    ];
    pool.query(queryText, queryParams)
    .then(result => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log('error adding new koala', error);
        res.sendStatus(500);
    })
})

// PUT
koalaRouter.put('/:koalaId', (req, res) => {
    console.log('koalaId is ', req.params.koalaId);
    console.log('req.body is', req.body.ready_to_transfer);

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
        .then((dbRes) => {
            res.sendStatus(204)
        })
        .catch((err) => {
            console.log('put failed', err);
            res.sendStatus(500);

        })
})

// DELETE

module.exports = koalaRouter;