export function generateRandomId() {
  const milliseconds = new Date().getTime(),
    days = new Date().getDay();
  return `${days}${milliseconds}`;
}
export function setItemLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
