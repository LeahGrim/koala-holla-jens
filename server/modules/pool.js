const pg = require('pg');

// A "pool" represents our connection to the database
const pool = new pg.Pool({
    // Name of the database
    // This is the only required parameter
    database: 'koala_holla',

    // Optional parameters are
    host: 'localhost',
    port: 5432
});

module.exports = pool;