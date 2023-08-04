enum Keys {
  userId = "user-id",
}

// TODO: unused
const localStorageUtil = new (class {
  private keyPrefix = "zoom-clone";

  public keys = Keys;

  public set<T>(key: Keys, value: T): void {
    if (!value) {
      return;
    }

    localStorage.setItem(`${this.keyPrefix}/${key}`, JSON.stringify(value));
  }

  public get<T>(key: Keys): T | null {
    try {
      const data = localStorage.getItem(`${this.keyPrefix}/${key}`);

      if (!data) {
        return null;
      }

      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  public remove(key: Keys): void {
    localStorage.removeItem(`${this.keyPrefix}/${key}`);
  }

  public clear(): void {
    localStorage.clear();
  }
})();

export default localStorageUtil;
