class APromise {
    constructor(main) {
        this.value = undefined;
        this.callbacks = [];

        const resolve = resolveValue => {
            this.value = resolveValue;

            this.triggerCallbacks();
        };

        main(resolve);
    }

    then(cb) {
        this.callbacks.push(cb);
    }

    triggerCallbacks() {
        this.callbacks.forEach(cb => {
            cb(this.value);
        });
    }
}


(function tester() {
    const p = new APromise(resolve => {
        setTimeout(() => resolve(100), 1000);
    });

    const p1 = p.then(x => console.log(x));
    const p2 = p.then(x => setTimeout(() => console.log(x), 1000));
})();