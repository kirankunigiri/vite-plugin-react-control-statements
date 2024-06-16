# Vite-React Control Statements
A Vite plugin for using React control statements. Inspired by traditional templating engines, [jsx-control-statements](https://github.com/AlexGilleran/jsx-control-statements), and logic blocks from Svelte.

---

### Installation

Install
```bash
npm i vite-plugin-react-control-statements @types/vite-plugin-react-control-statements
````

Add the plugin to your vite config.
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactControlStatements from 'vite-plugin-react-control-statements'

export default defineConfig({
    plugins: [react(), reactControlStatements()],
})
```

And you're ready to use it! Just import the components you need, and use them. Take a look at some examples below.

**Note:** you can declare them as global types if you want to avoid importing them in your code. These imports are just for TypeScript to recognize the components and are not needed by the Vite plugin.
```ts
import { If, Choose, Otherwise, When } from "vite-plugin-react-control-statements";
```

---

### Usage

Use `<If>`, `<Choose>`, `<When>`, and `<Otherwise>` components to conditionally render content. The plugin automatically converts them into traditional js control statements in your JSX or TSX code. Since it works directly on JSX and TSX files in general, you could also use it with Vue or any other libraries that use JSX/TSX.

Using code transformation with this plugin avoids some issues that arise when using actual React components for conditional rendering (see the notes at the end for more details).

**If Block** - Conditionally render content.
```tsx
<If condition={value}>
    <p>Hello!</p>
</If>
```

**Choose Block (When/Otherwise)** - This emulates a switch statement.
```tsx
<Choose>
    <When condition={value === 1}>
        <p>When: Value is 1</p>
    </When>
    <When condition={value === 2}>
        <p>When: Value is 2</p>
    </When>
    <Otherwise>
        <p>Otherwise: Value is above 2</p>
    </Otherwise>
</Choose>
```

**Automatic Wrapping**

The plugin automatically replaces the blocks with empty jsx tags (fragments), so a block can have multiple children without needing to wrap children with `<></>` tags.

```tsx
// Multiple children
<If condition={value}>
    <p>Hello!</p>
    <p>The if condition is true.</p>
</If>

// Text only
<If condition={value}>Hello!</If>
```

---

### Code Transform Examples

**If Block - Input/Output:**
```tsx
// Input
<If condition={value}>
    <p>Hello</p>
</If>

// Output
{value ? (<>
    <p>Hello</p>
</>) : null}
```

**Choose Block - Input/Output:**
```tsx
// Input
<Choose>
    <When condition={value === 1}>
        <p>When: Value is 1</p>
    </When>
    <When condition={value === 2}>
        <p>When: Value is 2</p>
    </When>
    <Otherwise>
        <p>Otherwise: Value is above 2</p>
    </Otherwise>
</Choose>

// Output
{value === 1 ? (<>
	<p>When: Value is 1</p>
</>) : value === 2 ? (<>
	<p>When: Value is 2</p>
</>) : value === 3 ? (<>
	<p>When: Value is 3</p>
</>) : <>
	<p>Otherwise: Value is above 2</p>
</>}
```

---

### Development
How to work on this project.
- Run `pnpm install` to install dependencies
- Edit the plugin in `package/src/plugin.ts` to make changes
- Run `pnpm build` to build the plugin
- Run `pnpm run dev` in the `example` folder to test the plugin
- Navigate to http://localhost:5173/__inspect to check the plugin transformation step (uses [vite-plugin-inspect](https://github.com/antfu-collective/vite-plugin-inspect))

### Potential Improvements
- Add an ESLint plugin, similar to [eslint-plugin-jsx-control-statements](https://github.com/vkbansal/eslint-plugin-jsx-control-statements)
- Plugins for other build tools
- Add more control statements or other components in general
- Add automated tests

---

### Similar Libraries
- [jsx-control-statements](https://github.com/AlexGilleran/jsx-control-statements) - uses babel
- [tsx-control-statements](https://github.com/KonstantinSimeonov/tsx-control-statements) - doesn't seem to work with vite
- [react-if]() - does not transpile code, but instead provides react components

### Notes

- What about ForEach loops?
  - They were not implemented because they make code more verbose than the existing `[].map()` which already works well. Since we require TypeScript definitions, it is difficult to create a ForEach component that is small.
- Why not make them global types by default?
  - Global types don't seem to work in npm packages unless the name is prefixed with '@types' or it requires manually adding the types to your tsconfig.
  - [More info here](https://stackoverflow.com/a/65196028/5579279)
  - There is a current PR in progress on the DefinitelyTyped team repo to add global types for each of the control statements.

- Why not just use custom React components (like with react-if)?
  - [This article](https://blog.bitsrc.io/the-pitfalls-of-using-guard-or-if-components-in-react-c8f85ea87295) provides a good explanation of the issues that using control components can cause. react-if actually solves one of the biggest issues of eager evaluation by recommending to use arrow functions, but it makes the code less readable. In the end, I thought code transpilation with Vite would be a better solution.
