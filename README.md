# Fetch-Rewards-Challenge
Web service to add, spend, and view points.
First and foremost have the latest LTS version node installed 
Available at https://nodejs.org/en/download/
clone repository
npm install
npm start

Available Endpoints
Add:
Must include payer, points, timestamp in request body
Example: {"payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" }
This will add a transaction into the local store.

spend:
Must include points to be spent in request body
Example: {"points": 5000}
This will display the points spent from each payer.

Finally
points:
This will display the number of available points from each payer.
