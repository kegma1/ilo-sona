const textTp = document.getElementById("write-tp");
const output = document.getElementById("output");

function textareaUpdate() {
  output.textContent = formatTP(textTp.value);
}

function formatTP(str) {
  str = str.toLowerCase();
  let inCartouche = false;
  let formattedStr = "";
  for (let c of str) {
    console.log(c);
    if (c == "[") {
      inCartouche = true;
      formattedStr += "[_";
      continue;
    } else if (c == "]") {
      inCartouche = false;
      formattedStr += "]";
      continue;
    }

    if (inCartouche && c == " ") {
      formattedStr += "_";
    } else {
      formattedStr += c;
    }
  }
  return formattedStr;
}
