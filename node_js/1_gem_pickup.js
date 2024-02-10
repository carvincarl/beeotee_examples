/*
1 Gem Pickup example.

This is a simple example to complete the first training session.

Be sure you have started the 1 Gem Pickup training session and fill in the
bot_id and bot_token below. You may need to reset the training session if
you get any errors.

Be sure to install the node-fetch package as a module.
    npm install node-fetch

This example was written with node 20.10.0.
*/

import fetch from 'node-fetch';

// Fill in your bot ID and token.
const botID = "";
const botToken = "";

// You should not have to change either of these values.
const botHost = "https://engine.beeotee.com";
const headers = {Authorization: "Bearer " + botToken,
                 "Content-Type": "application/json"};

/*****************************************************************************
 * Get your bot info.
 ****************************************************************************/
const botsURL = botHost + "/bots/" + botID;
const botsResponse = await fetch(botsURL, { headers });
console.log(botsResponse.status + " " + botsURL);
const botsData = await botsResponse.json();
console.log(botsData);
const gridID = botsData.grid;
console.log("on grid: " + gridID);

// Wait 3 seconds between all calls.
await new Promise(r => setTimeout(r, 3000));

/*****************************************************************************
 * Get your grid info.
 * This includes the bot location.
 ****************************************************************************/
const gridsURL = botHost + "/grids/" + gridID;
const gridsResponse = await fetch(gridsURL, { headers });
console.log(gridsResponse.status + " " + gridsURL);
const gridsData = await gridsResponse.json();
console.log(gridsData);
// We need the gem id. There should only be 1 gem, so it is easy to find.
const gemID = gridsData.items[0].id;

// Wait 3 seconds between all calls.
await new Promise(r => setTimeout(r, 3000));

/*****************************************************************************
 * Move one space to the left.
 ****************************************************************************/
const moveLocation = {x: 0, y: 0};
const moveURL = botsURL + "/location";
const moveResponse = await fetch(moveURL, {
    method: "put",
    body: JSON.stringify(moveLocation),
    headers,
});
console.log(moveResponse.status + " " + moveURL);
const moveData = await moveResponse.json();
console.log(moveData);

// Wait 3 seconds between all calls.
await new Promise(r => setTimeout(r, 3000));

/*****************************************************************************
 * Pick up the gem.
 ****************************************************************************/
const pickupURL = botsURL + "/items/" + gemID;
const pickupResponse = await fetch(pickupURL, {
    method: "put",
    headers,
});
console.log(pickupResponse.status + " " + pickupURL);
const pickupData = await pickupResponse.json();
console.log(pickupData);

console.log("Congratulations!");
console.log("Refresh the web site to see if you've completed the training session.");
