var express = require('express');
var router = express.Router();
var User = require('../models/User')
var bcrypt = require('bcrypt')

/* POST users signup listing. */
router.post('/signup', function (req, res, next) {
  User.find({ userName: req.body.userName })
    .then(result => {
      if (result.length == 0) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(404).json({
              message: err
            })
          } else {
            const user = new User({
              userName: req.body.userName,
              password: hash
            })

            user.save()
              .then(result => {
                console.log(hash)
                res.status(200).json({
                  message: "User Created Successfully"
                })
              })
              .catch(err => {
                res.status(404).json({
                  message: err
                })
              })

          }
        })
      } else {
        res.status(404).json({
          message: 'This user aready exists - let\'s sign in'
        })
      }
    })
    .catch(err => {
      res.status(404).json({
        message: err
      })
    })

});

// GET Signin listening
router.get('/signin', (req, res, next) => {
  User.find({ userName: req.body.userName })
    .then(user => {
      if (user.length == 1) {
        bcrypt.compare(req.body.password, user[0].password)
          .then(result => {
            if (result) {
              console.log(user[0])
              res.status(200).json({
                message: 'Login Sucessful'
              })
            } else {
              res.status(404).json({
                message: 'wrong password try again'
              })
            }
          })
          .catch(err => {
            res.status(404).json({
              message: err
            })
          })
      } else {
        res.status(404).json({
          message: 'wrong userName'
        })
      }
    })
    .catch(err => {
      res.status(404).json({
        message: err
      })
    })
})

// PATCH Update user listening
router.patch('/updateUser/:id', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const newUser = {
        userName: req.body.userName,
        password: hash
      }
      User.updateOne({ _id: req.params.id }, { $set: newUser })
        .then(result => {
          console.log(result)
          if (result.matchedCount == 1) {
            res.status(200).json({
              message: 'User updated successfully'
            })
          } else {
            res.status(404).json({
              message: 'User not found'
            })
          }
        })
        .catch(err => {
          res.status(404).json({
            message: err
          })
        })
    })
    .catch(err => {
      res.status(404).json({
        message: err
      })
    })
})

// Delete User Listening
router.delete('/deleteUser/:id', (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then(result => {
      if (result.deletedCount == 1) {
        res.status(200).json({
          message: 'User Deleted successfully'
        })
      } else {
        res.status(404).json({
          message: 'User not found'
        })
      }
    })
    .catch(err => {
      res.status(404).json({
        message: err.message
      })
    })
})

module.exports = router;
