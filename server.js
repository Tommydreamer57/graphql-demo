const express = require('express');
const cors = require('cors');
const { postgraphile } = require('postgraphile');
require('dotenv').config();

const {
    env: {
        CONNECTION_STRING,
        SERVER_PORT,
    }
} = process;

const app = express();

app.use(cors());

app.use(postgraphile(CONNECTION_STRING, { graphiql: true }));

app.listen(SERVER_PORT, () => console.log(`Postgraphile listening on port: ${SERVER_PORT}`));
