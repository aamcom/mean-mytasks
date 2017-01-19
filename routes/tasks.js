var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://matache:matache@ds117909.mlab.com:17909/malistedetaches',['tasks'])

//recup toutes les taches
router.get('/tasks', (req, res, next) => {
    db.tasks.find((err, tasks)=>{
        if(err){
            res.send(err);
        }
        res.json(tasks)
    });

});

//recup 1  tache
router.get('/tasks/:id', (req, res, next) => {
    db.tasks.findOne(
            {_id: mongojs.ObjectId(req.params.id)},
            (err, task)=>{
                if(err){
                    res.send(err);
                }
                res.json(task);
            }
    );
});

//save 1  tache
router.post('/task', (req, res, next) => {
    var task = req.body;
    if (!task.title || (task.isDone + '')){
        res.status(400);
        res.json({
            "error": "bad data"
        })
    }
    else {
        db.tasks.save(task, (err, task) => {
            if(err){
                    res.send(err);
                }
                res.json(task);
        })
    }
});

//recup 1  tache
router.delete('/tasks/:id', (req, res, next) => {
    db.tasks.remove(
            {_id: mongojs.ObjectId(req.params.id)},
            (err, task)=>{
                if(err){
                    res.send(err);
                }
                res.json(task);
            }
    );
});

//update 1  tache
router.put('/tasks/:id', (req, res, next) => {
    var task = req.body;
    var updTask = {};
    if(task.isDone){
        updTask.isDone = task.isDone;
    }
    if(task.title){
        updTask.title = task.title;
    }
    if (!updTask){
        res.status(400);
        res.json({
            "error": "bad data"
        })
    }
    else {
        db.tasks.update(
            {
                _id: mongojs.ObjectId(req.params.id)
            }, 
            updTask , 
            {},
            (err, task) => {
                if(err){
                        res.send(err);
                    }
                    res.json(task);
            })
    }
});

module.exports = router;
