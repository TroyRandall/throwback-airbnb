// backend/routes/api/index.js
const router = require('express').Router();


// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);


module.exports = router;
