const express = require('express');
const { otpVerify, otpVerifyCOntroller, otpVerifyController } = require('../../controllers/web/authentication/otpVerifyCOntroller');

const authentication = express.Router();

authentication.post('/create', otpVerify); // 👈 POST /website/authentication/create

authentication.post('/verify',otpVerifyController); // 👈 POST /website/authentication/verify

module.exports = { authentication };

//http://localhost:8000/website/authentication/create

//http://localhost:8000/website/authentication/verify