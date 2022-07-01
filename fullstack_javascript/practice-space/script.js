class Cat {
    constructor(name) {
        this.name = name;
    }

    speak() {
        return `${this.name} makes a noise.`;
    }
}

class Lion extends Cat {
    speak() {
        return { test: super.speak(), tast: `${this.name} roars.` };
    }
}

let l = new Lion('Fuzzy');
console.log(l.speak());





