#!/usr/bin/env node

import {rps, rpsls} from "./lib/rpsls.js"
import express from 'express'
import minimist from 'minimist'

var argv = minimist(process.argv.slice(2));
const port = argv.port || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/app', (req, res) => {
    res.status(200).send('200 OK').end();
});

// Random RPS shot
app.get('/app/rps', (req, res) => {
    res.status(200).send(JSON.stringify(rps(req.body.shot))).end();
})

// Random RPSLS shot
app.get('/app/rpsls', (req, res) => {
    res.status(200).send(JSON.stringify(rpsls(req.body.shot))).end();
})

// Endpoint /app/rps/play/ 
// URL encoded
app.get('/app/rps/play', (req, res) => {
    res.status(200).send(JSON.stringify(rps(req.query.shot))).end();
})

// Endpoint /app/rpsls/play
// URL encoded
app.get('/app/rpsls/play', (req, res) => {
    res.status(200).send(JSON.stringify(rpsls(req.query.shot))).end();
})

// Endpoint /app/rps/play/(rock|paper|scissors)/
app.get('/app/rps/play/:shot', (req, res) => {
	res.status(200).send(rps(req.params.shot));
});

// Endpoint /app/rpsls/play/(rock|paper|scissors|lizard|spock)/
app.get('/app/rpsls/play/:shot', (req, res) => {
	res.status(200).send(rpsls(req.params.shot));
});

// POSTS

// Endpoint /app/rps/play/(rock|paper|scissors)/
app.post('/app/rps/play/', (req, res) => {
    res.status(200).send(JSON.stringify(rps(req.body.shot))).end();
});

// Endpoint /app/rpsls/play/(rock|paper|scissors|lizard|spock)/
app.post('/app/rpsls/play/', (req, res) => {
    res.status(200).send(JSON.stringify(rpsls(req.body.shot))).end();
});

// Default
app.all('*', (req, res) => {
    res.status(404).send('404 NOT FOUND').end();
})

app.listen(port);