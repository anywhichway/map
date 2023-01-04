import argWaiter from "arg-waiter";

const map = argWaiter(async (iterable,f,what="values") => {
    if(typeof(iterable.map)==="function") {
        return iterable.map(f);
    }
    const result = [];
    let forOK,
        i = 0;
    try {
        for await (const item of iterable) {
            forOK = true;
            result.push(await f(item,i,iterable));
            i++;
        }
        return result;
    } catch(e) {
        if(forOK) {
            throw e;
        }
    }
    if(typeof(what)==="function") {
        iterable = await what(iterable)
    } else if(typeof(iterable[what])==="function")  {
        iterable = await iterable[what]();
    } else if(typeof(iterable.forEach)==="function") {
        const values = [];
        iterable.forEach((value) => values.push(value));
        iterable = values;
    }
    for await (const item of iterable) {
        result.push(await f(item,i++,iterable))
    }
    return result;
})

export {map, map as default}