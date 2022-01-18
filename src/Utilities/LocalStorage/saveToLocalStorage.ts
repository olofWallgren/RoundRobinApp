/////// Sparar till localStorage /////////////
export function saveToLocalStorage(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value));
}
/////// Hämtar från localStorage /////////////
export function getLocalStorage(key: string) {
  let data = [];
  try {
    let result = JSON.parse(localStorage.getItem(key) || "");
    data.push(result);
  } catch (error) {}

  return data;
}
