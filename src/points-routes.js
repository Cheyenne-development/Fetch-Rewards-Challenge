const express = require("express");
const store = require("./store");

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
        const spent = [];
            let tmp = {};
       
        for(let i = 0;i< store.points.length;i++) {
           let { payer, points } = store.points[i];
            if(pointsToSpend === 0) break;
            if(pointsToSpend >= points) {
                if(!tmp[payer]) {
                    tmp[payer] = points * -1
                } else {
                    tmp[payer] -= points;
                }

                pointsToSpend -= points;
                store.points[i].points = 0
            } else {
                if(!tmp[payer]) {
                    tmp[payer] = pointsToSpend * -1
                } else {
                    tmp[payer] -= pointsToSpend;
                }
                
                
            store.points[i].points -= pointsToSpend;
                pointsToSpend = 0;
        }
    }

    let keys = Object.keys(tmp)
    for(let i = 0; i < keys.length; i++) {
        spent.push({"payer": keys[i], "points": tmp[keys[i]]})
    }

        res.status(200).send(spent)
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
