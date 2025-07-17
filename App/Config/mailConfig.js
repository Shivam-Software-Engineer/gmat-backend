const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.email",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "maxiwise.fullstackdev@gmail.com",
    pass: "wxmpethtbukzcijn",
  },
});

module.exports={transporter}
