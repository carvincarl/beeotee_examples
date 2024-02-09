"""
1 Gem Pickup example.

This is a simple example to complete the first training session.

Be sure you have started the 1 Gem Pickup training session and fill in the
bot_id and bot_token below. You may need to reset the training session if
you get any errors.

Be sure the requests package is installed.
    pip install requests

This example runs with Python 3.8 and above.
"""
from time import sleep
import requests

# Fill in your bot ID and token here.
bot_id = ""
bot_bearer_token = ""

# You should not have to change either of these values.
bot_host = "https://engine.beeotee.com"
headers = {"Authorization": f"Bearer {bot_bearer_token}"}

##############################################################################
# Get your bot info.
##############################################################################
url = f"{bot_host}/bots/{bot_id}"
response = requests.get(url, headers=headers)
content = response.json()
print(f"{response.status_code} {url}")
print(content)
assert response.status_code == 200
# Get the grid id.
grid_id = content["grid"]
print(f"on grid: {grid_id}")

# Wait 3 seconds between all calls.
sleep(3)

##############################################################################
# Get your grid info.
# This includes the bot location. If the bot is not at location 1,0,
# reset the training session.
##############################################################################
url = f"{bot_host}/grids/{grid_id}"
response = requests.get(url, headers=headers)
content = response.json()
print(f"{response.status_code} {url}")
print(content)
assert response.status_code == 200
# We need the gem id. There should only be 1 gem, so it is easy to find.
gem_id = content["items"][0]["id"]

# Wait 3 seconds between all calls.
sleep(3)

##############################################################################
# Move one space to the left.
##############################################################################
location = {"x": 0, "y": 0}
url = f"{bot_host}/bots/{bot_id}/location"
response = requests.put(url, json=location, headers=headers)
content = response.json()
print(f"{response.status_code} {url}")
print(content)
assert response.status_code == 200

# Wait 3 seconds between all calls.
sleep(3)

##############################################################################
# Pick up the gem.
##############################################################################
url = f"{bot_host}/bots/{bot_id}/items/{gem_id}"
response = requests.put(url, json=location, headers=headers)
content = response.json()
print(f"{response.status_code} {url}")
print(content)
assert response.status_code == 200

print("Congratulations!")
print("Refresh the web site to see if you've completed the training session.")
