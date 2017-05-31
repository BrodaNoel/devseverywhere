export const storage = {
  local: {
    save(key, value) {
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

    get(key) {
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
