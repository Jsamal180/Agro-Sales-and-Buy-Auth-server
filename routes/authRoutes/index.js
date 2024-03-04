const express = require("express");
const router = express.Router();

const jwtAuthController = require('../../controller/jwtAuthController');

router.post('/signup', jwtAuthController.signup);

module.exports = router;