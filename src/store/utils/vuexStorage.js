import 'babel-polyfill'
import * as shvl from "shvl";
const storeAsyncKey = "storeAsync"
const vuexStorage = {
  storageKeys: [],
  sessionKeys: [],
  store: null,
  init(storageKeys = [], sessionKeys = []) {
    this.storageKeys = storageKeys;
    this.sessionKeys = sessionKeys;
    // Vuex 的 store 接受 plugins 选项，这个选项暴露出每次 mutation 的钩子。
    // Vuex 插件就是一个函数，它接收 store 作为唯一参数
    return store => {
      this.$store = store;
      if (this.storageKeys.length) {
        this.initStorage();
      }
      if (this.sessionKeys.length) {
        this.initSession();
      }
      // 当 store 初始化后调用
      // 会在每个 mutation 完成后调用，接收 mutation 和经过 mutation 后的状态作为参数
      store.subscribe((mutation, state) => {
        // mutation 之后被调用
        // mutation 的格式为 {type, payload}。
        if (this.storageKeys.length) {
          this.storageAsync(state);
        }
        if (this.sessionKeys.length) {
          this.sessionAsync(state);
        }
      });
    };
  },
  // 初始化
  // 将state中数据 更新为 本地存储的数据
  initStorage() {
    let localStorage = window.localStorage.getItem(storeAsyncKey); // 取出localstorage中的值
    localStorage = JSON.parse(localStorage); // 转为json格式
    if (!this.storageKeys.length || !localStorage) return false;
    const storage = this.$store.state;
    this.storageKeys.forEach(sessionKey => {
      if(sessionKey.includes('/')){ // 模块化
        let storage1 = storage[sessionKey.split('/')[0]]
        let key1 = sessionKey.split('/')[1]
        const val = shvl.get(localStorage, sessionKey);
        shvl.set(storage1, key1, val);
      } else {
        const val = shvl.get(localStorage, sessionKey);
        shvl.set(storage, sessionKey, val);
      }
    });
    this.$store.replaceState(storage);
  },
  initSession() {
    let localStorage = window.sessionStorage.getItem(storeAsyncKey);
    localStorage = JSON.parse(localStorage);
    if (!this.sessionKeys.length || !localStorage) return false;
    const storage = this.$store.state;
    this.sessionKeys.forEach(sessionKey => {
      if(sessionKey.includes('/')){ // 模块化
        let storage1 = storage[sessionKey.split('/')[0]]
        let key1 = sessionKey.split('/')[1]
        const val = shvl.get(localStorage, sessionKey);
        shvl.set(storage1, key1, val);
      } else {
        const val = shvl.get(localStorage, sessionKey);
        shvl.set(storage, sessionKey, val);
      }
    });
    this.$store.replaceState(storage);
  },
  // 观察motation操作
  // 将本地存储的数据 更新为 state中数据
  storageAsync(state) {
    const storage = {};
    this.storageKeys.forEach(sessionKey => {
      if(sessionKey.includes('/')){ // 模块化
        let state1 = state[sessionKey.split('/')[0]]
        let key1 = sessionKey.split('/')[1]
        const val = shvl.get(state1, key1);
        shvl.set(storage, sessionKey, val);
      } else {
        const val = shvl.get(state, sessionKey);
        shvl.set(storage, sessionKey, val);
      }
    });
    window.localStorage.setItem(storeAsyncKey, JSON.stringify(storage));
  },
  sessionAsync(state) {
    const storage = {};
    this.sessionKeys.forEach(sessionKey => {
      if(sessionKey.includes('/')){ // 模块化
        let state1 = state[sessionKey.split('/')[0]]
        let key1 = sessionKey.split('/')[1]
        const val = shvl.get(state1, key1);
        shvl.set(storage, sessionKey, val);
      } else {
        const val = shvl.get(state, sessionKey);
        shvl.set(storage, sessionKey, val);
      }
    });
    window.sessionStorage.setItem(storeAsyncKey, JSON.stringify(storage));
  },
};
export default vuexStorage;
