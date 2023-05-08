export function readLocalStorage(key) {
	return JSON.parse(localStorage.getItem(key));
}