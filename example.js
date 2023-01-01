import map from "./index.js";

const generator = function *() {
    for(let i=0;i<5;i++) {
        yield i
    }
}

const asyncGenerator = async function *() {
    for(let i=0;i<5;i++) {
        yield i
    }
}

const set = new Set([0,1,2,3,4]);

map(generator(),(value) => console.log("generator",value));
map(asyncGenerator(),(value) => console.log("asyncGenerator",value));
map(set,(value) => console.log("set",value));