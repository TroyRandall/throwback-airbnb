const express = require("express");
const { check, cookie } = require("express-validator");
const { User, Spot } = require("../../db/models");
const router = express.Router();

router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll();

    return res.json({
        "Spots": spots
    })
});

module.exports = router;
