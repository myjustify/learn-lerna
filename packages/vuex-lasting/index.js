import * as shvl from "shvl";

export default function lasting(options = {}) {
  return (store) => {
    let { key, opt, paths = [] } = options;
    key = key || "lasting";
    opt = opt || {
      set: (k, v) => {
        try {
          v = JSON.stringify(v);
        } catch (err) {
          console.warn("lasting set err:", err);
        }
        return localStorage.setItem(`${key}-${k}`, v);
      },
      get: (k) => {
        let v = localStorage.getItem(`${key}-${k}`);
        try {
          v = JSON.parse(v);
        } catch (err) {
          console.warn("lasting get err:", err);
        }
        return v;
      },
      rm: (k) => {
        return localStorage.removeItem(`${key}-${k}`);
      }
    };

    for (let i = 0; i < paths.length; i++) {
      const son = paths[i];
      const sv = opt.get(son);
      sv && shvl.set(store.state, son, sv);
      store.watch(
        (state) => shvl.get(state, son),
        (v) => {
          opt.set(son, v);
        }
      );
    }
  };
}
