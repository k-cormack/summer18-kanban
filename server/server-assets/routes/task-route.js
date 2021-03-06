let router = require('express').Router()
let Task = require('../models/task')
let mongoose = require('mongoose')

//GET
router.get('/', (req, res, next) => {
  // @ts-ignore
  Task.find({ authorId: req.session.uid })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(400).send(err)
      
    })
})

//POST
router.post('/', (req, res, next) => {
  // @ts-ignore
  req.body.authorId = req.session.uid
  Task.create(req.body)
    .then(newBoard => {
      res.send(newBoard)
    })
    .catch(err => {
      res.status(400).send(err)
      
    })
})

//PUT
router.put('/:id', (req, res, next) => {
  Task.findById(req.params.id)
    .then(board => {
      // @ts-ignore
      if (!board.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      board.update(req.body, (err) => {
        if (err) {
          res.status(400).send(err)
          
          return
        }
        res.send("Successfully Updated")
      });
    })
    .catch(err => {
      res.status(400).send(err)
      
    })
})

//DELETE
router.delete('/:id', (req, res, next) => {
  Task.findById(req.params.id)
    .then(board => {
      // @ts-ignore
      if (!board.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      Task.findByIdAndRemove(req.params.id)
        .then(data => {
          res.send('DELORTED')
        })
    })
})

//COMMENT STUFF BELOW!!

//route: tasks/:taskId/comments data: comment
router.post('/:taskId/comments', (req, res, next) => {
  // @ts-ignore
  req.body.authorId = req.session.uid
  //SUPER COOLER WAY TO ACHIEVE THE SAME AS BELOW
  Task.findByIdAndUpdate(req.params.taskId, { $push: { comments: req.body } }, { new: true })
    .then(task => {
      res.send(task)
    })
    .catch(err => {
      res.status(400).send("it broke")
    })
})

router.get('/:taskId/comments', (req, res, next) => {
  Task.findById(req.params.taskId)
    .then(task => {
      res.send(task.comments)
    })
    .catch(err => {
      res.status(400).send(err)
      
    })
})

router.delete('/:taskId/comments/:commentId', (req, res, next) => {
  Task.findById(req.params.taskId)
    .then(task => {
      task.comments.id(req.params.commentId).remove()
      task.save((err) => {
        if (err) {
          res.status(400).send(err)
          return res.status(500).send("failed to remove comment")
        }
        return res.send(task)
      })
    })
})





module.exports = router


  //----------------------------------------------------
  // Task.findById(req.params.taskId)
  //   .then(task=>{
    //     task.comments = task.comments.concat(req.body)
    //     task.save((err) =>{
      //       if (err){
        //         res.status(400).send(err)
        //         return res.status(500).send("failed to add comment")
        //       }
        //       return res.send(task)
        //     })
        //   })
        //   .catch(err=>{
          //     res.status(400).send(err)
          //     res.status(400).send('broke')
          //   })
  //----------------------------------------------------