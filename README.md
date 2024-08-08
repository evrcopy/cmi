# cmi (color me impressed)

A simple one-file TypeScript library for coloring text in the terminal.

```typescript
console.log('I am green!'.green());
console.log('I am blue and bold!'.b().blue());
console.log('I am red on yellow background!'.red().bgYellow());
```

## Installation

### Without package manager

Just copy [`cmi.ts`](cmi.ts) to your project and add an import to your application's entrypoint:

```typescript
// add f.e. to the top of imports in your index.ts file
import './cmi';
```

### Via node modules

Package not published yet.

## Development

> Note: CMI was built with Bun, but it will work with Node as well

Setup:

```sh
# Just to pull Bun internal types for tests
bun install
```

Run tests:

```sh
bun test
```
