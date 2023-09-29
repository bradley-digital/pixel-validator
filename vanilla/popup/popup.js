const root = document.getElementById("root");
const h1 = document.createElement("h1");
h1.innerText = "Hello world";
root.appendChild(h1);

chrome.webRequest.onCompleted.addListener(async (details) => {
  console.log(details);
}, { urls: ["<all_urls>"] });
