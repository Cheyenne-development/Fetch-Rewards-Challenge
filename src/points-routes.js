const express = require("express");
const store = require("./store");
const inArray = require("./inArray")

const pointsRoutes = express.Router();
const bodyParser = express.json();

pointsRoutes
    .route('/points')
    
    .get((req, res) => {
        let score = {}
        
        for(let i = 0; i <store.points.length; i++) {
            let { payer, points } = store.points[i]
            if(!score[payer]){
                score[payer] = points;
            } else {
                score[payer] += points;
            }
        }
        res.status(200).send(score)
    })

pointsRoutes
    .route('/spend')
    .patch(bodyParser, (req, res) => {
        let pointsToSpend  = req.body.points;
        const spent = []
       
        for(let i = 0;i< store.points.length;i++) {
           let { payer, points } = store.points[i];
            if(pointsToSpend === 0) break;
            if(pointsToSpend >= points) {
                if(inArray(payer, points, spent)) {
            } else {
                points *= -1
                spent.push({payer, points})
            }

                pointsToSpend -= store.points[i].points;
                store.points[i].points = 0
            } else {
                store.points[i].points -= pointsToSpend;
                pointsToSpend = 0;
                if(inArray(payer, points, spent)) {
            } else {
                points = (points - store.points[i].points) * -1
                spent.push({payer, points})
            }
        }
    }

        res.status(201).send(spent)
    })    

pointsRoutes    
    .route("/add")
    .post(bodyParser, (req, res) => {
  const { payer, points, timestamp } = req.body;

  const total = {
    payer,
    points,
    timestamp
  };

 
      let len = store.points.length;
    for(let i = 0; i < len; i++) {

        if(store.points[i]['timestamp'] >= total.timestamp) {
            store.points.splice(i, 0, total);
            break;
        }
      }
      if (len === store.points.length) {
          store.points.push(total);
      }
    
  



  res.status(201).send("Points added");
});

module.exports = pointsRoutes;
