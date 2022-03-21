require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyparser = require('body-parser');

const PORT = process.env.PORT;

const app = express();
const db = require('./db/maria.connection');

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.json({ type: "application/json" }));

app.get('/', (req, res) => {
    res.send('index.html');
});

app.get('/api/db', async (req, res) => {
    const dataFromDB = await db.query("SELECT * FROM open_tickets");
    res.json(dataFromDB);
});

app.post('/api/db', async (req, res) => {
    const dataFromDB = await db.query(`
        INSERT INTO open_tickets (title, description, submission_date)
        VALUES ("${req.body.title}", "${req.body.description}", NOW());
    `);
    res.json({
        body: req.body,
        status: 'OK'
    });
});

app.get('/api/db/delete', async (req, res) => {
    const dataFromDB = await db.query(`
        DELETE FROM open_tickets;
    `);
    res.json({
        status: 'OK'
    });
});

app.listen(PORT, process.env.HOSTNAME, () => {
    console.log(`App listening on localhost:${PORT}`);
});