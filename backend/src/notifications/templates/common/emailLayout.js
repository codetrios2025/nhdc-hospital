module.exports = ({ title = "", heading = "", content = "" }) => {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<style>

body{
    margin:0;
    padding:0;
    background:#f5f6fa;
    font-family:Arial,Helvetica,sans-serif;
}

.wrapper{
    width:100%;
    padding:40px 0;
}

.container{
    width:650px;
    margin:auto;
    background:#ffffff;
    border-radius:8px;
    overflow:hidden;
    border:1px solid #eeeeee;
}

.header{
    background:#0d6efd;
    color:#ffffff;
    text-align:center;
    padding:25px;
}

.header h1{
    margin:0;
    font-size:24px;
}

.body{
    padding:30px;
    color:#444;
    line-height:1.7;
}

.footer{
    background:#fafafa;
    border-top:1px solid #eeeeee;
    text-align:center;
    padding:20px;
    color:#777;
    font-size:13px;
}

table{
    width:100%;
    border-collapse:collapse;
    margin-top:20px;
}

table td{
    border:1px solid #eeeeee;
    padding:10px;
}

.label{
    width:180px;
    background:#f8f8f8;
    font-weight:bold;
}

</style>

</head>

<body>

<div class="wrapper">

<div class="container">

<div class="header">

<h1>
${title}
</h1>

</div>

<div class="body">

<h2>
${heading}
</h2>

${content}

</div>

<div class="footer">

<strong>
Namokar Hospital & Diagnostic Centre
</strong>

<br><br>

This is an automated email.

Please do not reply.

</div>

</div>

</div>

</body>

</html>
`;
};
