// @flow

const storage = {
  local: {
    save(key: string, value: any): boolean {
      try {
        window.localStorage.setItem(
          key,
          JSON.stringify(value)
        );
        return true;

      } catch (e) {
        return false;
      }
    },

    get(key: string): any {
      try {
        return JSON.parse(
          window.localStorage.getItem(key)
        );

      } catch (e) {
        // :shrug:
      }
    }
  }
};

export default storage;
