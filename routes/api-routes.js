const path = require("path");
let db = require("../models");




// /api/workouts/range
// /api/workouts/range

module.exports = function (app) {
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .sort({date: 1})
    .then(workouts => {
      res.json(workouts);
    })
    .catch(err => {
      console.error(err)
      res.status(400).json(err);
    });
  });

  app.put("/api/workouts/:id", (req, res)=>{
      const id = req.params.id;
      db.Workout.findByIdAndUpdate(id,
        {
          $push: {
            exercises: req.body
          }
        }, { new: true })
        .then(function (workout) {
            res.send(workout)
        })
        .catch(function (err) {
            if (err) throw err
        });
  });

  app.post("/api/workouts", (req, res) => {
    db.Workout.create({})
      .then(workout => {
        res.json(workout);
    })
      .catch(err => {
        res.status(400).json(err);
  });
  });

  app.get("/api/workouts/range", (req, res) =>{
    db.Workout.find({})
    .then(function(workout){
        res.send(workout)
    })
    .catch(function(err){
        if(err)throw err
    });


  });
}
