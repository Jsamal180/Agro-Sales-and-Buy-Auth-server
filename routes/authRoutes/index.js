const express = require("express");
const router = express.Router();

const jwtAuthController = require('../../controller/jwtAuthController');

router.post('/signup', jwtAuthController.signup);
router.post('/login', jwtAuthController.login);

module.exports = router;