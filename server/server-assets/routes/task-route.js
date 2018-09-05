let router = require('express').Router()
let Task = require('../models/task')
let mongoose = require('mongoose')

//GET
router.get('/', (req, res, next) => {
  Task.find({ authorId: req.session.uid })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//POST
router.post('/', (req, res, next) => {
  req.body.authorId = req.session.uid
  Task.create(req.body)
    .then(newBoard => {
      res.send(newBoard)
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//PUT
router.put('/:id', (req, res, next) => {
  Task.findById(req.params.id)
    .then(board => {
      if (!board.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      board.update(req.body, (err) => {
        if (err) {
          console.log(err)
          next()
          return
        }
        res.send("Successfully Updated")
      });
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

//DELETE
router.delete('/:id', (req, res, next) => {
  Task.findById(req.params.id)
    .then(board => {
      if (!board.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      Task.findByIdAndRemove(req.params.id)
        .then(data => {
          res.send('DELORTED')
        })
    })
})

//route: tasks/:taskId/comments data: comment
router.post('/:taskId/comments', (req, res, next)=>{
  Task.findById(req.params.taskId)
    .then(task=>{
      task.comments.push(req.body)
      task.save((err) =>{
        if (err){
          console.log(err)
          return res.status(500).send("failed to add comment")
        }
        return res.send(task)
      })
    })
})

router.delete('/:taskId/comments/:commentId', (req, res, next)=>{
  Task.findById(req.params.taskId)
    .then(task=>{
      task.comments.id(_id).remove()
      task.save((err) =>{
        if (err){
          console.log(err)
          return res.status(500).send("failed to remove comment")
        }
        return res.send(task)
      })
    })
})





module.exports = router