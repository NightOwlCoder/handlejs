// Import stylesheets
import "./style.css";

// Write Javascript code!
const appDiv = document.getElementById("app");
appDiv.innerHTML = `<h1>Webhooks Validation</h1>`;

const status = document.getElementById("status");

window.webhook = function(type) {
  var xamarinObj = { type: type, msg: "unrecognized" };
  if (window.webkit) {
    switch (type) {
      case "navigate":
        xamarinObj = {
          version: "1.2",
          source: "wealthManagement",
          type: "signOut"
        };
        var payload = JSON.stringify(xamarinObj);
        status.textContent += "\niOS sending: " + payload;
        window.webkit.messageHandlers.navigate.postMessage(payload);
        status.textContent += "\niOS OK: " + type;
        break;
      case "error":
        xamarinObj = {
          version: "1.2",
          source: "wealthManagement",
          code: 1001,
          message: "Errormessage",
          severity: "severe"
        };
        var payload = JSON.stringify(xamarinObj);
        status.textContent += "\niOS sending: " + payload;
        window.webkit.messageHandlers.error.postMessage(payload);
        status.textContent += "\niOS OK: " + type;
        break;
      case "upload":
        xamarinObj = {
          version: "1.2",
          name: "wealthManagement",
          type: "uploadDocument",
          from: "report.pdf",
          fileType: "filetype"
        };
        var payload = JSON.stringify(xamarinObj);
        status.textContent += "\niOS sending: " + payload;
        window.webkit.messageHandlers.upload.postMessage(payload);
        status.textContent += "\niOS OK: " + type;
        break;
      case "featureEvent":
        xamarinObj = {
          version: "1.2",
          name: "wealthManagement",
          type: "downloadDocument",
          targeturl: "report.pdf"
        };
        var payload = JSON.stringify(xamarinObj);
        status.textContent += "\niOS sending: " + payload;
        window.webkit.messageHandlers.featureEvent.postMessage(payload);
        status.textContent += "\niOS OK: " + type;
        break;
      case "analytics":
        xamarinObj = {
          version: "1.2",
          name: "wealthManagement",
          type: "dynamicScreen",
          name: "signingout"
        };
        var payload = JSON.stringify(xamarinObj);
        status.textContent += "\niOS sending: " + payload;
        window.webkit.messageHandlers.analytics.postMessage(payload);
        status.textContent += "\niOS OK: " + type;
        break;
    }
  } else if (window.WebViewFragment) {
    switch (type) {
      case "navigate":
        xamarinObj = {
          version: "1.2",
          source: "wealthManagement",
          type: "signOut"
        };
        var payload = JSON.stringify(xamarinObj);
        status.textContent += "\nAndroid sending: " + payload;
        window.WebViewFragment.onNavigateWebHook(payload);
        status.textContent += "\nAndroid OK: " + type;
        break;
      case "error":
        xamarinObj = {
          version: "1.2",
          source: "wealthManagement",
          code: 1001,
          message: "Errormessage",
          severity: "severe"
        };
        var payload = JSON.stringify(xamarinObj);
        status.textContent += "\nAndroid sending: " + payload;
        window.WebViewFragment.onErrorWebHook(payload);
        status.textContent += "\nAndroid OK: " + type;
        break;
      case "upload":
        xamarinObj = {
          attention: "***upload is using the onFeatureEventWebHook, there was none defined on the document***",
          version: "1.2",
          name: "wealthManagement",
          type: "uploadDocument",
          from: "report.pdf",
          fileType: "filetype"
        };
        var payload = JSON.stringify(xamarinObj);
        status.textContent += "\nAndroid sending: " + payload;
        window.WebViewFragment.onFeatureEventWebHook(payload);
        status.textContent += "\nAndroid OK: " + type;
        break;
      case "featureEvent":
        xamarinObj = {
          version: "1.2",
          name: "wealthManagement",
          type: "downloadDocument",
          targeturl: "report.pdf"
        };
        var payload = JSON.stringify(xamarinObj);
        status.textContent += "\nAndroid sending: " + payload;
        window.WebViewFragment.onFeatureEventWebHook(payload);
        status.textContent += "\nAndroid OK: " + type;
        break;
      case "analytics":
        xamarinObj = {
          version: "1.2",
          name: "wealthManagement",
          type: "dynamicScreen",
          name: "signingout"
        };
        var payload = JSON.stringify(xamarinObj);
        status.textContent += "\nAndroid sending: " + payload;
        window.WebViewFragment.onAnalyticsWebHook(payload);
        status.textContent += "\nAndroid OK: " + type;
        break;
    }
  } else {
    status.textContent += "\nFAIL 1: " + type;
  }
};

window.invokeCSCode = function invokeCSCode(data) {
  try {
    var xamarinObj = { key: data };
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
