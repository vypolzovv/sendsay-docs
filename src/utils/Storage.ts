export class Storage {
  public key: string;

  constructor(key: string) {
    this.key = key;
  }

  get() {
    return localStorage.getItem(this.key);
  }

  getJSON<T>() {
    return JSON.parse(localStorage.getItem(this.key)) ?? ({} as T);
  }

  set(value: string) {
    localStorage.setItem(this.key, value);
  }

  setJSON(value) {
    const json = JSON.stringify(value);

    localStorage.setItem(this.key, json);
  }

  remove() {
    localStorage.removeItem(this.key);
  }
}
