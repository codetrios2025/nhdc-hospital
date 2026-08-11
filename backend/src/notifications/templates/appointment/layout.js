const LOGO_URL =
  "https://namokarhospitaldeoli.com/assets/nhdc-logo-CJoxj7eN.png";

const BANNER_URL =
  "https://namokarhospitaldeoli.com/assets/hospital-slide-DrhfrtfT.webp";

module.exports = (title, content) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>${title}</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f4f6f8;
    font-family:Arial,Helvetica,sans-serif;
  "
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="background:#f4f6f8;"
>
  <tr>
    <td align="center" style="padding:25px 10px;">

      <!-- Main Container -->

      <table
        width="700"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="
          max-width:700px;
          width:100%;
          background:#ffffff;
          border-radius:8px;
          overflow:hidden;
        "
      >

        <!-- Logo Header -->

        <tr>
          <td
            align="center"
            style="
              padding:20px;
              background:#ffffff;
            "
          >

            <a
              href="https://namokarhospitaldeoli.com/"
              target="_blank"
              style="text-decoration:none;"
            >

              <img
                src="${LOGO_URL}"
                alt="Namokar Hospital & Diagnostic Centre"
                style="
                  display:block;
                  max-width:260px;
                  width:auto;
                  height:auto;
                  margin:0 auto;
                  border:0;
                "
              >

            </a>

          </td>
        </tr>

        <!-- Banner -->

        <tr>
          <td>

            <img
              src="${BANNER_URL}"
              alt="Namokar Hospital & Diagnostic Centre"
              width="700"
              style="
                display:block;
                width:100%;
                max-width:700px;
                height:auto;
                border:0;
              "
            >

          </td>
        </tr>

        <!-- Title -->

        <tr>
          <td
            style="
              padding:25px 30px 10px 30px;
              text-align:center;
            "
          >

            <h2
              style="
                margin:0;
                color:#174ea6;
                font-size:24px;
                line-height:1.4;
              "
            >
              ${title}
            </h2>

          </td>
        </tr>

        <!-- Content -->

        <tr>
          <td
            style="
              padding:10px 30px 30px 30px;
              color:#333333;
              font-size:15px;
              line-height:1.6;
            "
          >

            ${content}

          </td>
        </tr>

        <!-- Footer -->

        <tr>
          <td
            style="
              background:#f1f5f9;
              padding:20px 30px;
              text-align:center;
              color:#666666;
              font-size:13px;
              line-height:1.6;
            "
          >

            <strong style="color:#174ea6;">
              Namokar Hospital & Diagnostic Centre
            </strong>

            <br>

            Deoli, Tonk, Rajasthan

            <br>

            <a
              href="https://namokarhospitaldeoli.com/"
              target="_blank"
              style="
                color:#174ea6;
                text-decoration:none;
              "
            >
              namokarhospitaldeoli.com
            </a>

            <br><br>

            This is an automated email.
            Please do not reply directly to this email.

            <br><br>

            © ${new Date().getFullYear()}
            Namokar Hospital & Diagnostic Centre.
            All Rights Reserved.

          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
`;
};
