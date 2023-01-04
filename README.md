# map
Map for any iterable, promised iterable, or item that can be converted into an iterable.

# Usage

```javascript
await map(item,func,what="values")
```

The 'item' could be a generator, async generator, Set, etc.

# How It Works

1. awaits `item` so that if it is a Promise, it resolves
2. tries to use
   1. native `map` on `item
   2. `for await(value of await item)` directly on the `item`
   3. `for await()` on the result of calling the method with the `what` name on item or if `what` is a function its return value when passed `item`
   4. `for await()` on the result of using native `forEach`, if available on item, to collect values from `item`

# Release History (Reverse Chronological Order)

2023-01-04 v1.0.0 Added unit tests, 95.83% test coverage

2023-01-01 v0.0.1 Initial public release
  
