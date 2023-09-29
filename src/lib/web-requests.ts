import {
  getLocal,
  setLocal,
} from "./storage";

const k = "webRequests";

export async function getWebRequests() {
  return getLocal(k);
}

export async function setWebRequest(value: any) {
  let data: any = [];
  const existing = await getWebRequests();
  if (Array.isArray(existing)) {
    data = existing;
  }
  data.push(value);
  return setLocal(k, data);
}

