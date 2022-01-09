'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const path = require('path');
const { messages } = require('./messages');
const PORT = process.env.PORT || 3000;

const config = {
  channelSecret: 'd76730144a4f01fa52868d05b0edbf49',
  channelAccessToken:
    '4rgj9Rt4VS6dPICFe0LeK6i16IZ0dsdgSZGRnXJKMkjhpLAR4JemNA63wfKtswvHOno2df2NBMzTm0vZgP5Pl7PR3dZKVqFakzIBClTZi8EWim/yiXVpeJ8wXf7n4MG5yl+r/J1A0usEriVvKMhaOQdB04t89/1O/w1cDnyilFU=',
};

const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
  console.log(req.body.events);
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

app.use(express.static(path.join(__dirname, 'public')));

const client = new line.Client(config);

function handleEvent(event) {
  if (event.type == 'join' || event.type == 'follow') {
    return client.pushMessage(event.source.groupId, [
      messages.mes1,
      messages.mes2,
    ]);
  }
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);
