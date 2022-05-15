const { ObjectId } = require('mongoose').Types;
const { User, Thought, reactionSchema} = require('../models')

const thoughtController = {
    getThought(req, res){
        Thought.find()
        .sort({createdAt: -1})
        .then((info) =>{
            res.json(info)
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
    getSingleThought(req, res){
        Thought.findOne({_id: req.params.thoughtId})
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
    createThought(req, res){
        Thought.create(req.body)
        .then((info) =>{
            return User.findOneAndUpdate(
                {_id: req.body.userId},
                {$push: {thoughts: info._id}},
                {new: true}
            )
        }).then((data) => {
        if (!data){
            return res.status(404)
        } 
          res.json(data)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
    updateThought(req, res){
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$set: req.body}, {runValidators: true, new: true})
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
    deleteThought(req, res){
        Thought.findOneAndDelete({_id: req.params.thoughtId})
        .then((info) =>{
            if (!info){
              return res.status(404)
            } 
            return User.findOneAndUpdate( {_id: req.body.thoughId},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true})
        }).then(() =>
        res.json({message: "User can't remember thought"})).catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
    addReaction(req, res){
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$addToSet: {reactions: req.body}}, {runValidators: true, new: true})
        .then((info) =>{
            if (!info){
              return res.status(404)
            } 
            res.json(info)
        });
    },
    deleteReaction(req, res){
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$pull: {reactions: {reactionId: req.params.reactionId}}}, {new: true})
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

module.exports = thoughtController;