const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose")
const Vote = require("../model/Vote.js");

const Pusher = require("pusher");

let pusher = new Pusher({
  appId: "1272131",
  key: "5eebcaa203111be8fb46",
  secret: "07bc03ca2b5887b9804d",
  cluster: "ap2",
  useTLS: true,
});

//set route
router.get("/", (req, res) => {
  //getting votes from the database
  Vote.find().then((votes) => res.json({ success: true, votes: votes }));
});
router.post("/", (req, res) => {
  const newVote = {
    zt: req.body.zt,
    points: 1,
  };
  //saving the votes to the database
  new Vote(newVote).save().then((vote) => {
    pusher.trigger("zt-poll", "zt-vote", {
      //convert vote points to intergers
      points: parseInt(vote.points),
      zt: vote.zt,
    });
    return res.json({
      success: true,
      message: `thank you for voting`,
    });
  });
});
//export router
module.exports = router;
