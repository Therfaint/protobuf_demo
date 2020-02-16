class store {
    constructor(defaultStore) {
        this.store = {};
    }

    get(key) {
        return this.store.hasOwnProperty(key) && this.store[key];
    }

    getStore() {
        return this.store;
    }

    set(key, value) {
        Object.assign(this.store, {[key]: value})
    }

    setDefault(defaultStore) {
        Object.assign(this.store, defaultStore)
    }
}

export default new store();
