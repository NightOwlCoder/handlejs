// Import stylesheets
import "./style.css";

// Write Javascript code!
const appDiv = document.getElementById("app");
appDiv.innerHTML = `<h1>JavaScript Calls Validation</h1>`;

const status = document.getElementById("status");

window.invokeCSCode = function invokeCSCode(data, param) {
  try {
    var xamarinObj = { command: data, parameters: param };
    var payload = JSON.stringify(xamarinObj);
    if (window.invokeCSharpAction != null) {
      status.textContent += "\nOK" + payload;
      window.invokeCSharpAction(payload);
    } else {
      var error = "\nFAIL: " + payload;
      status.textContent += error;
      console.log(error);
    }
  } catch (err) {
    console.log(err);
  }
};
