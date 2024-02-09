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

const bot_id = "";
const bot_token = "";

// You should not have to change either of these values.
const bot_host = "https://engine.beeotee.com";
const headers = {Authorization: "Bearer " + bot_token,
                 "Content-Type": "application/json"};

/*****************************************************************************
 * Get your bot info.
 ****************************************************************************/
const bots_url = bot_host + "/bots/" + bot_id;
const bots_response = await fetch(bots_url, { headers });
console.log(bots_response.status + " " + bots_url);
const bots_data = await bots_response.json();
console.log(bots_data);
const grid_id = bots_data.grid;
console.log("on grid: " + grid_id);

// Wait 3 seconds between all calls.
await new Promise(r => setTimeout(r, 3000));

/*****************************************************************************
 * Get your grid info.
 * This includes the bot location.
 ****************************************************************************/
const grids_url = bot_host + "/grids/" + grid_id;
const grids_response = await fetch(grids_url, { headers });
console.log(grids_response.status + " " + grids_url);
const grids_data = await grids_response.json();
console.log(grids_data);
// We need the gem id. There should only be 1 gem, so it is easy to find.
const gem_id = grids_data.items[0].id;

// Wait 3 seconds between all calls.
await new Promise(r => setTimeout(r, 3000));

/*****************************************************************************
 * Move one space to the left.
 ****************************************************************************/
const move_location = {x: 0, y: 0};
const move_url = bots_url + "/location";
const move_response = await fetch(move_url, {
    method: "put",
    body: JSON.stringify(move_location),
    headers,
});
console.log(move_response.status + " " + move_url);
const move_data = await move_response.json();
console.log(move_data);

// Wait 3 seconds between all calls.
await new Promise(r => setTimeout(r, 3000));

/*****************************************************************************
 * Pick up the gem.
 ****************************************************************************/
const pickup_url = bots_url + "/items/" + gem_id;
const pickup_response = await fetch(pickup_url, {
    method: "put",
    headers,
});
console.log(pickup_response.status + " " + pickup_url);
const pickup_data = await pickup_response.json();
console.log(pickup_data);

console.log("Congratulations!");
console.log("Refresh the web site to see if you've completed the training session.");
