import map from "./index.js";

test("Array",async () => {
    const iterable = [1,2,3],
        result = await map(iterable,(value) => value);
    expect(result.every((value,i) => value===iterable[i])).toBe(true);
    expect(result.length).toBe(iterable.length);
})

test("promised Array",async () => {
    const asyncIterable = new Promise((resolve) => resolve([1,2,3])),
        result = await map(asyncIterable,(value) => value),
        iterable = await asyncIterable;
    expect(result.every((value,i) => value===iterable[i])).toBe(true);
    expect(result.length).toBe(iterable.length);
})

test("Set",async () => {
    const iterable = new Set([1,2,3]),
        result = await map(iterable,(value) => value);
    expect(result.every((value) => iterable.has(value))).toBe(true);
    expect(result.length).toBe(iterable.size);
})

test("Generator",async () => {
    const iterable = [1,2,3],
        generator = (function*(iterable) { for(const value of iterable) yield value })(iterable),
        result = await map(generator,(value) => value);
    expect(result.every((value,i) => value===iterable[i])).toBe(true);
    expect(result.length).toBe(iterable.length);
})

test("asyncGenerator",async () => {
    const iterable = [1,2,3],
        generator = (async function*(iterable) { for(const value of iterable) yield value })(iterable),
        result = await map(generator,(value) => value);
    expect(result.every((value,i) => value===iterable[i])).toBe(true);
    expect(result.length).toBe(iterable.length);
})

test("asyncGenerator - promised values",async () => {
    const iterable = [1,2,3],
        generator = (async function*(iterable) { for(const value of iterable) yield new Promise((resolve) => resolve(value)) })(iterable),
        result = await map(generator,(value) => value);
    expect(result.every((value,i) => value===iterable[i])).toBe(true);
    expect(result.length).toBe(iterable.length);
})

test("promised asyncGenerator - promised values",async () => {
    const iterable = [1,2,3],
        generator = new Promise((resolve) => resolve((async function*(iterable) { for(const value of iterable) yield new Promise((resolve) => resolve(value)) })(iterable))),
        result = await map(generator,(value) => value);
    expect(result.every((value,i) => value===iterable[i])).toBe(true);
    expect(result.length).toBe(iterable.length);
})

test("Object.values",async () => {
    const object = {a:1,b:2,c:3},
        result = await map(object,(value) => value,(target) => Object.values(target)),
        iterable = Object.values(object);
    expect(result.every((value,i) => value===iterable[i])).toBe(true);
    expect(result.length).toBe(iterable.length);
})

test("Object - custom values method",async () => {
    const iterable = [1,2,3],
        object = {getValues(){ return iterable}},
        result = await map(object,(value) => value,"getValues");
    expect(result.every((value,i) => value===iterable[i])).toBe(true);
    expect(result.length).toBe(iterable.length);
})

test("Object - forEach",async () => {
    const iterable = [1,2,3],
        object = {
            forEach(f) {
                iterable.forEach((item,i,array) => f(item,i,array))
            }
        },
        result = await map(object,(value) => value);
    expect(result.every((value,i) => value===iterable[i])).toBe(true);
    expect(result.length).toBe(iterable.length);
})


test("map not a function",async () => {
    const iterable = [1,2,3];
    let result;
    try {
        result = await map(iterable);
    } catch(e) {
        expect(e).toBeInstanceOf(Error);
    }
   expect(result).toBe(undefined);
})
