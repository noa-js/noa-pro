export function setToken(token: string) {
  localStorage.setItem('token', token);
}

export function getToken() {
  localStorage.getItem('token');
}

export function clearToken() {
  localStorage.removeItem('token');
}