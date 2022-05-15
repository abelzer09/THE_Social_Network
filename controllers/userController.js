const { ObjectId } = require('mongoose').Types;
const { User, Thought, reactionSchema} = require('../models')

const userController = {
    getUsers(req, res){
        User.find()
        .then((info) =>{
            res.json(info)
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
    getSingleUser(req, res){
        User.findOne({_id: req.params.userId})
        .populate("friends")
        .populate("thoughts")
        .then((info) =>{
            if (!info){
              return res.status(404)
            } 
            res.json(info)
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
    createUser(req, res){
        User.create(req.body)
        .then((info) =>{
            res.json(info)
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
    updateUser(req, res){
        User.findOneAndUpdate({_id: req.params.userId}, {$set: req.body}, {runValidators: true, new: true})
        .then((info) =>{
            if (!info){
              return res.status(404)
            } 
            res.json(info)
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
    deleteUser(req, res){
        User.findOneAndDelete({_id: req.params.userId})
        .then((info) =>{
            if (!info){
              return res.status(404)
            } 
            return Thought.deleteMany( {_id: {$in: info.thoughts} } )
        }).then(() =>
        res.json({message: "User can't remember thought"})).catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
    addFriend(req, res){
        User.findOneAndUpdate({_id: req.params.userId}, {$addToSet: {friends: req.params.friendId}}, {new: true})
        .then((info) =>{
            if (!info){
              return res.status(404)
            } 
            res.json(info)
        });
    },
    deleteFriend(req, res){
        User.findOneAndUpdate({_id: req.params.userId}, {$pull: {friends: req.params.friendId}}, {new: true})
        .then((info) =>{
            if (!info){
              return res.status(404)
            } 
            res.json(info)
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
};

module.exports = userController;