const nodemailer = require("nodemailer");

/**
 * =====================================================
 * CREATE SMTP TRANSPORTER
 * =====================================================
 */
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "smtp.gmail.com",

  port: Number(process.env.MAIL_PORT || 587),

  secure: process.env.MAIL_SECURE === "true",

  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

/**
 * =====================================================
 * VERIFY SMTP CONNECTION
 * =====================================================
 *
 * This helps us detect incorrect Gmail SMTP
 * configuration when the backend starts.
 */
const verifyEmailTransporter = async () => {
  try {
    await transporter.verify();

    console.log("Email SMTP connection verified successfully");

    return true;
  } catch (error) {
    console.error("Email SMTP connection failed:", error.message);

    return false;
  }
};

/**
 * =====================================================
 * SEND PASSWORD RESET EMAIL
 * =====================================================
 */
const sendPasswordResetEmail = async ({ email, name, resetUrl }) => {
  if (!email) {
    throw new Error("Recipient email is required");
  }

  if (!resetUrl) {
    throw new Error("Password reset URL is required");
  }

  const mailOptions = {
    from: `"Namokar Hospital & Diagnostic Centre" <${process.env.MAIL_USER}>`,

    to: email,

    subject: "Reset Your Admin Password",

    html: `
      <!DOCTYPE html>

      <html>
      <head>

        <meta charset="UTF-8" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        <title>Reset Password</title>

      </head>

      <body
        style="
          margin:0;
          padding:0;
          background:#f5f7fb;
          font-family:Arial,Helvetica,sans-serif;
        "
      >

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
        >

          <tr>

            <td
              align="center"
              style="padding:30px 15px;"
            >

              <table
                width="600"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  width:100%;
                  max-width:600px;
                  background:#ffffff;
                  border-radius:10px;
                  overflow:hidden;
                "
              >

                <!-- ================================= -->
                <!-- LOGO                              -->
                <!-- ================================= -->

                <tr>

                  <td
                    align="center"
                    style="
                      padding:25px;
                      background:#ffffff;
                    "
                  >

                    <img
                      src="https://namokarhospitaldeoli.com/assets/nhdc-logo-CJoxj7eN.png"
                      alt="Namokar Hospital & Diagnostic Centre"
                      style="
                        max-width:180px;
                        width:100%;
                        height:auto;
                        display:block;
                        margin:auto;
                      "
                    />

                  </td>

                </tr>


                <!-- ================================= -->
                <!-- BANNER / TITLE                    -->
                <!-- ================================= -->

                <tr>

                  <td
                    style="
                      background:#f7f8fa;
                      text-align:center;
                      padding:25px 20px;
                    "
                  >

                    <h1
                      style="
                        margin:0;
                        color:#1e3a5f;
                        font-size:26px;
                        line-height:1.3;
                      "
                    >
                      Reset Your Password
                    </h1>

                  </td>

                </tr>


                <!-- ================================= -->
                <!-- CONTENT                            -->
                <!-- ================================= -->

                <tr>

                  <td
                    style="
                      padding:30px;
                    "
                  >

                    <p
                      style="
                        margin:0 0 15px;
                        color:#333333;
                        font-size:16px;
                      "
                    >
                      Hello ${name || "Admin"},
                    </p>


                    <p
                      style="
                        margin:0 0 15px;
                        color:#555555;
                        font-size:15px;
                        line-height:1.7;
                      "
                    >
                      We received a request to reset the
                      password for your NHDC admin account.
                    </p>


                    <p
                      style="
                        margin:0 0 15px;
                        color:#555555;
                        font-size:15px;
                        line-height:1.7;
                      "
                    >
                      Click the button below to create
                      a new password.
                    </p>


                    <!-- ================================= -->
                    <!-- RESET BUTTON                       -->
                    <!-- ================================= -->

                    <div
                      style="
                        text-align:center;
                        margin:30px 0;
                      "
                    >

                      <a
                        href="${resetUrl}"
                        style="
                          display:inline-block;
                          padding:14px 30px;
                          background:#e91e63;
                          color:#ffffff;
                          text-decoration:none;
                          border-radius:6px;
                          font-size:15px;
                          font-weight:bold;
                        "
                      >
                        Reset Password
                      </a>

                    </div>


                    <!-- ================================= -->
                    <!-- EXPIRY INFORMATION                 -->
                    <!-- ================================= -->

                    <p
                      style="
                        margin:0 0 10px;
                        color:#777777;
                        font-size:13px;
                        line-height:1.6;
                      "
                    >
                      This password reset link will expire
                      in <strong>30 minutes</strong>.
                    </p>


                    <p
                      style="
                        margin:0;
                        color:#777777;
                        font-size:13px;
                        line-height:1.6;
                      "
                    >
                      If you did not request a password reset,
                      you can safely ignore this email.
                    </p>

                  </td>

                </tr>


                <!-- ================================= -->
                <!-- FOOTER                            -->
                <!-- ================================= -->

                <tr>

                  <td
                    style="
                      background:#f7f8fa;
                      padding:20px;
                      text-align:center;
                    "
                  >

                    <p
                      style="
                        margin:0;
                        color:#777777;
                        font-size:12px;
                      "
                    >
                      Namokar Hospital & Diagnostic Centre
                    </p>

                  </td>

                </tr>

              </table>

            </td>

          </tr>

        </table>

      </body>
      </html>
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);

    console.log("Password reset email sent:", result.messageId);

    return result;
  } catch (error) {
    console.error("Password reset email failed:", error.message);

    throw new Error("Unable to send password reset email");
  }
};

module.exports = {
  sendPasswordResetEmail,
  verifyEmailTransporter,
};
