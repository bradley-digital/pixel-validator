chrome.webRequest.onCompleted.addListener(async (details) => {
  console.log(details);
  //let data = [];
  //const existing = await chrome.storage.local.get("webRequests");
  //if (existing["webRequests"]) {
  //  data = existing["webRequests"];
  //}
  //data.push(details);
  //await chrome.storage.local.set({ "webRequests": data });
}, { urls: ["<all_urls>"] });
