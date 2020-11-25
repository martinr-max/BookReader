const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const userController = require('../controllers/userController');

router.post('/signup', [
    check('name')
        .not()
        .isEmpty(),
    check('email')
        .normalizeEmail()
        .isEmail()
        .not()
        .isEmpty()
    ],
    userController.signup);


router.post('/login', [
    check('email')
        .normalizeEmail()
        .isEmail()
        .not()
        .isEmpty()
    ],
    userController.login);




module.exports = router;