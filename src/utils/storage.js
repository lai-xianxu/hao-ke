export function setStorage(key, params) {
  let data = JSON.stringify(params || "");
  localStorage.setItem(key, data);
}
export function getStorage(key) {
  let data = localStorage.getItem(key);
  try {
    data = JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return data;
}
