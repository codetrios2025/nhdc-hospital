const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: Number(process.env.MAIL_PORT) === 465,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Connection Failed");
    console.error(error.message);
  } else {
    console.log("✅ SMTP Server Connected Successfully");
  }
});

module.exports = transporter;
