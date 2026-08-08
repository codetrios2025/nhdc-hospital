module.exports = (text, url) => {
  if (!url) return "";

  return `

<div style="margin-top:30px;text-align:center;">

<a
href="${url}"

style="
background:#0d6efd;
color:#ffffff;
padding:12px 25px;
border-radius:5px;
text-decoration:none;
display:inline-block;
font-weight:bold;
"

>

${text}

</a>

</div>

`;
};
