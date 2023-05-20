const express = require("express")
const router = express.Router()
const Player = require("../models/player")

// Get one
router.get("/:id", getPlayer, (req, res) => {
    res.json(res.player)
})
// Get many
router.get("/", async (req, res) => {
    try {
        const players = await Player.find()
        res.json(players)
    } catch (e) {
        res.status(500).json({message : e.message})
    }
})
// Post (one)
router.post("/", async (req, res) => {
    const player = new Player({
        nickname: req.body.nickname,
        password: req.body.password
    })
    try {
        console.log("In")
        const newPlayer = await player.save()
        console.log("In")
        res.status(201).json(newPlayer)
        res.send()
    } catch (e) {
        res.status(400).json({message : e.message})
    }
})
// Update
router.patch("/:id", getPlayer, async (req, res) => {
    console.log(req.body)
    res.player.gamesPlayed += req.body.gamePlayed
    res.player.gamesWonTotal += req.body.gameWon
    res.player.gamesWonAsMafia += req.body.mafiaWon & req.body.gameWon
    try {
        const updatedPlayer = await res.player.save()
        res.json(updatedPlayer)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
})
// Delete (one)
router.delete("/:id", getPlayer, async (req, res) => {
    try {
        res.player.deleteOne()
        res.json({message : `Deleted subscriber ${req.params.id}`})
    } catch (e) {
        res.status(500).json({message : e.message})
    }
})

async function getPlayer(req, res, next) {
    let player
    try {
        player = await Player.findById(req.params.id)
        if (player == null) {
            return res.status(404).json({ message: `No subscriber with id ${req.params.id}`})
        }
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }

    res.player = player
    next()
}

module.exports = router
