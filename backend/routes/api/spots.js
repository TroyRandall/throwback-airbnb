const express = require("express");
const { check, cookie } = require("express-validator");
const { User, Spot } = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");

router.get('/currentuser', requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const spots = await Spot.findAll({
        where: {ownerId: userId}
    });

    return res.json({
        "Spots": spots
    });
})

router.get('/:id', async (req, res, next) => {
    const id = +req.params.id;
    const spots = await Spot.findAll({
        where: {
            id: id
        }
    });

    return res.json({
        
    })
})
router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll();

    return res.json({
        "Spots": spots
    })
});


module.exports = router;
