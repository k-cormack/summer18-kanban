let router = require('express').Router()
let List = require('../models/list')
let Task = require('../models/task')

// GET tasks by list
router.get('/:id/tasks', (req, res, next) => {
  // @ts-ignore
  Task.find({ listId: req.params.id })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(400).send(err)
      next()
    })
})

//GET
router.get('/', (req, res, next) => {
  // @ts-ignore
  List.find({ authorId: req.session.uid })
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
  // @ts-ignore
  req.body.authorId = req.session.uid
  List.create(req.body)
    .then(newBoard => {
      res.send(newBoard)
    })
    .catch(err => {
      res.status(400).send(err)
      next()
    })
})

//PUT
router.put('/:id', (req, res, next) => {
  List.findById(req.params.id)
    .then(board => {
      // @ts-ignore
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
  List.findById(req.params.id)
    .then(board => {
      // @ts-ignore
      if (!board.authorId.equals(req.session.uid)) {
        return res.status(401).send("ACCESS DENIED!")
      }
      List.findByIdAndRemove(req.params.id)
        .then(data => {
          res.send('DELORTED')
        })
    })
})


module.exports = router