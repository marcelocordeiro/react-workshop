# React Workshop 1 — Core Concepts for Backend Engineers

## How to use this script

This workshop is written for experienced **backend engineers** (Java, Kotlin, or similar) who are about to start contributing to a React + TypeScript dashboard and have little or no frontend background.

- Every numbered chapter from **1 to 18** maps 1:1 to a page in the sidebar of the companion app. Run `yarn start`, open the page, and read the chapter next to it.
- Analogies are given in **Java** first, with a **Kotlin** note where the Kotlin idiom is closer.
- The examples here are deliberately tiny. The goal is that you recognise the _shape_ of the code when you open a real 500-line screen, not that you memorise APIs.
- Chapters **19 onwards** are about the surrounding practice: testing, browser tooling, AI-assisted development, and the ways a real production codebase differs from this clean example app.

**A note on library versions.** Two codebases can be equally healthy React and still share almost no import lines. Where that happens, this script teaches the **current** API and gives you a mapping table for the older one — routing (chapter 16) and data fetching (chapter 11) both get one. Read the table in whichever direction your repo needs. Chapter 22 collects every such difference in one place.

**Suggested pacing for a live session (~4h with a break):**

| Block                        | Chapters   | Time   |
| ---------------------------- | ---------- | ------ |
| Orientation                  | Part I     | 30 min |
| Rendering & JS refresher     | Part II    | 25 min |
| Core hooks                   | 2–7        | 50 min |
| _Break_                      |            | 10 min |
| Performance & escape hatches | 8–9, 12–13 | 30 min |
| Server state & forms         | 10, 11, 14 | 35 min |
| Styling & routing            | 15–16      | 20 min |
| State & strings at scale     | 17–18      | 25 min |
| Testing & tooling            | 19–21      | 35 min |

If you are short on time, chapters 8, 9 and 15 are the safest to skim — they are the ones you can learn on demand later.

---

# Part I — Orientation

## What React is, and what it is not

- **It is a library, not a framework.** It renders a UI and re-renders it when data changes. It has no opinion about HTTP clients, routing, forms, validation, or state management. Every one of those is a separate dependency you choose — which is why frontend dependency lists look long compared to a Spring Boot service.
- **It is component-based.** A component is a function that takes data in and returns a description of UI. You compose small components into bigger ones, the same way you compose methods and classes.
- **It is declarative.** You describe what the UI should look like _for the current data_, and React works out the DOM operations needed to get there. You never write `document.getElementById(...).innerText = ...`. This is the single biggest mindset shift: you stop writing instructions for changing the screen and start writing a function from state to screen.

The mental model in one line:

```
UI = f(state)
```

Your job is to write `f` and to manage `state`. React owns everything between `f` and the pixels.

## The Rosetta Stone

Keep this table open for the whole workshop. Everything after this is an elaboration of it.

| React / frontend concept      | Java analogy                                                                                                     | Kotlin note                                                          |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Component                     | A class whose entire job is one pure `String render(Props)` method                                               | If you know Compose: a `@Composable` function — almost the same idea |
| Props                         | Constructor arguments passed as one immutable DTO                                                                | A `data class` with `val` fields only                                |
| `children` prop               | A template slot; or passing a lambda body into a method                                                          | A trailing lambda                                                    |
| State (`useState`)            | A private field that the framework preserves between calls to `render`                                           | `var` inside a remembered scope                                      |
| Re-render                     | The framework calls your `render` method again with new inputs                                                   |                                                                      |
| `useEffect`                   | `@PostConstruct` / `@PreDestroy`, or registering a listener after construction                                   |                                                                      |
| `useEffect` cleanup           | `close()` in try-with-resources; `AutoCloseable`                                                                 | `use { }`                                                            |
| `useContext`                  | Dependency injection — asking the container for a bean instead of threading a parameter through five call layers |                                                                      |
| `useReducer`                  | Command pattern, or an event-sourced aggregate: `apply(state, event) -> state`                                   | `sealed class` + exhaustive `when`                                   |
| `useMemo`                     | `@Cacheable` on a pure method, keyed by its arguments                                                            | `by lazy`, except it recomputes when inputs change                   |
| `useCallback`                 | Hoisting a lambda so its _identity_ stays stable across calls                                                    |                                                                      |
| `React.memo`                  | A guard that skips work when arguments are equal to last time                                                    |                                                                      |
| `useRef`                      | A mutable field the framework does not watch                                                                     |                                                                      |
| Custom hook                   | Extracting logic into a helper — but the helper keeps state per caller                                           |                                                                      |
| JSX                           | A type-safe builder DSL that compiles to constructor calls                                                       | Kotlin's type-safe HTML builders                                     |
| The Virtual DOM diff          | Computing a minimal `UPDATE` instead of `DELETE` + `INSERT` of every row                                         |                                                                      |
| `key` in a list               | A primary key. Without it the diff matches rows by ordinal position                                              |                                                                      |
| React Query                   | A repository + `@Cacheable` + `@Retryable` with staleness rules                                                  |                                                                      |
| Query key                     | The cache key                                                                                                    |                                                                      |
| `invalidateQueries`           | `cacheManager.getCache(x).evict(key)`                                                                            |                                                                      |
| Router                        | `@RequestMapping` — URL pattern to handler                                                                       |                                                                      |
| `useParams`                   | `@PathVariable`                                                                                                  |                                                                      |
| `useSearchParams`             | `@RequestParam`                                                                                                  |                                                                      |
| `package.json` + `yarn.lock`  | `pom.xml` / `build.gradle` + lockfile                                                                            |                                                                      |
| Vite / webpack                | Build tool + a dev server with hot reload                                                                        |                                                                      |
| ESLint + Prettier             | Checkstyle / SpotBugs + Spotless                                                                                 |                                                                      |
| Jest                          | JUnit                                                                                                            |                                                                      |
| React Testing Library         | MockMvc — assert on the rendered output, not on internals                                                        |                                                                      |
| `jest.mock('x')`              | Mockito `mock(X.class)`                                                                                          |                                                                      |
| `jest.requireActual` + spread | Mockito `spy()` — real object, one method replaced                                                               |                                                                      |
| MSW (Mock Service Worker)     | WireMock / MockServer                                                                                            |                                                                      |
| A store (Zustand / Redux)     | A singleton service holding state that components observe                                                        |                                                                      |
| i18n `t('key')`               | `ResourceBundle` / `messages_xx.properties` lookup                                                               |                                                                      |
| Cypress                       | An end-to-end suite driving a real browser, like Selenium against a deployed app                                 |                                                                      |

## What TypeScript buys you

TypeScript is JavaScript plus a static type system that is erased at build time. There is no runtime type checking — think of it as generics erasure taken to its logical conclusion: **the types exist only for the compiler**.

- **Catches the boring bugs**: passing a `string` where a `number` was expected, forgetting a field, misspelling a property.
- **Makes editors useful**: autocomplete, go-to-definition, safe rename.
- **Acts as documentation**: an `interface` at the top of a file tells you the contract without reading the body.
- **Structural, not nominal.** This surprises Java developers most. Two types with the same shape are interchangeable — there is no `implements` needed. If it has the right fields, it fits.

```ts
interface User {
  id: number;
  name: string;
}

// No `implements User` anywhere. It fits because the shape fits.
const u = { id: 1, name: 'Ada' };
```

Two habits that will save you time:

- `interface` for object shapes, `type` for unions and aliases. Either works; teams mostly pick one and stay consistent.
- Avoid `any`. It switches off the compiler for that value and everything it touches. `unknown` is the honest version — it forces you to narrow before use.

## The stack of a typical dashboard

There is no single "React stack". The table below shows this workshop app next to the two shapes of real dashboard you are most likely to join — an **established** one that has been shipping for years, and a **recent** one started on current defaults.

| Concern            | This workshop app                        | An established codebase         | A recent codebase                     |
| ------------------ | ---------------------------------------- | ------------------------------- | ------------------------------------- |
| Language           | TypeScript (latest)                      | TypeScript, several majors old  | TypeScript (latest)                   |
| Build / dev server | Vite                                     | webpack                         | webpack or Vite                       |
| Package manager    | Yarn                                     | Yarn or npm                     | Yarn or npm                           |
| UI components      | Material-UI (MUI) v5                     | MUI + a data-grid library       | an **in-house design system**, no MUI |
| Data fetching      | `@tanstack/react-query` v5 + Axios       | **react-query v3** + Axios      | `@tanstack/react-query` v5 + an SDK   |
| Forms              | React Hook Form (inline rules)           | React Hook Form (inline rules)  | React Hook Form + a **schema** (Zod)  |
| Routing            | React Router v6                          | **React Router v5**             | React Router v6                       |
| Styling            | `sx` prop, `styled()`, styled-components | styled-components + some legacy | styled-components + CSS tokens        |
| Global state       | Context + Zustand                        | Context providers               | **Zustand** + context                 |
| i18n               | react-i18next                            | react-i18next                   | react-i18next, many locales           |
| Unit tests         | Jest + RTL + MSW                         | Jest + RTL + MSW                | Jest + RTL + **injected fake client** |
| E2E tests          | none                                     | none                            | **Cypress**                           |

Read that table as reassurance, not as a warning. **Every concept in this workshop applies to all three columns.** What differs is import lines, a handful of function names, and which library owns a job. Chapter 22 lists every difference you are likely to hit, and chapters 10 and 16 give you direct mapping tables for the two that bite hardest.

---

# Part II — How React actually works

You will be more effective if you understand the engine before the API. This part has no code to run; it is the model that makes the rest predictable.

## The DOM

When a browser loads a page it parses the HTML into a tree of objects called the **DOM** (Document Object Model). It is a live, in-memory model of the document — the same idea as parsing XML into a tree of nodes on the backend, except that mutating this tree repaints the screen.

The problem: DOM mutations are expensive. Changing an element can force the browser to recompute layout and repaint (_reflow_ and _repaint_). Doing that a hundred times in a loop is a real performance cliff.

**Live Console Demos (Run these on the companion app with Paint Flashing turned on):**

1. **Local Repaint (Cheap Mutation):**

   ```javascript
   document.getElementsByClassName(
     'MuiTypography-root MuiTypography-h6 MuiTypography-noWrap css-8u39c-MuiTypography-root',
   )[0].innerText = 'Hello!!!!';
   ```

   _Explanation:_ Notice how only that specific header element flashes green. The browser is highly optimized: since this text change didn't push or resize surrounding elements, the browser only calculated layout for that one element and performed a highly localized repaint of its visual bounds.

2. **Reflow Cascade (Expensive Mutation):**
   ```javascript
   document.getElementsByClassName(
     'MuiTypography-root MuiTypography-body1 MuiListItemText-primary css-10hburv-MuiTypography-root',
   )[5].style.height = '200px';
   ```
   _Explanation:_ Watch as the elements below it also flash green. Because we modified a layout property (height), the browser had to run a global **Reflow** (recalculating coordinates for all subsequent elements shifted down), forcing a cascade of layout recalculations and repaints.

## The Virtual DOM and reconciliation

React keeps a lightweight description of the UI in plain JavaScript objects — the **Virtual DOM**. It is a blueprint, not the building.

When state changes:

1. **State change** — you call a setter, e.g. `setCount(1)`.
2. **Render** — React calls your component functions again and builds a _new_ VDOM tree.
3. **Diff** — it compares the new tree with the previous one.
4. **Commit** — it applies the minimal set of real DOM operations needed.

> **Database analogy.** Naive UI code is `DELETE FROM page; INSERT ...` on every change. Reconciliation computes the equivalent `UPDATE page SET cell = ... WHERE id = ...`.

Two consequences you will feel immediately:

- **Render is cheap; commit is not.** React may call your component many times. That is fine — as long as your component is pure.
- **`key` matters.** When rendering a list, `key` is the primary key React uses to match old rows to new rows. Without a stable `key`, React falls back to position, and a row inserted at the top makes every row below it look "changed".

```tsx
// Wrong: index as key. Insert at the top and React thinks every row changed.
{
  users.map((user, index) => <Row key={index} user={user} />);
}

// Right: a stable identity from the data.
{
  users.map((user) => <Row key={user.id} user={user} />);
}
```

## Render must be pure

A component function must be a pure function of its props and state: same inputs, same output, no side effects during render.

This is not a style preference — React relies on it. In development, `<StrictMode>` deliberately calls your component **twice** to smoke out impurity, the same way you would run a job twice to check it is idempotent.

```tsx
// ❌ side effect during render — runs twice in dev, and on every re-render
const Bad = ({ id }) => {
  analytics.track('viewed', id); // don't
  return <div>{id}</div>;
};

// ✅ side effects belong in an effect
const Good = ({ id }) => {
  useEffect(() => {
    analytics.track('viewed', id);
  }, [id]);
  return <div>{id}</div>;
};
```

## State is a snapshot

This is the most common source of "React makes no sense" moments.

Each render has its own copy of state and props. A function defined during a render **closes over the values from that render** — it does not see later updates.

```tsx
const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1); // count is the value from THIS render
  setCount(count + 1); // ...still the same value. Result: +1, not +2
  console.log(count); // logs the OLD value — state is not a variable you mutate
};
```

The fix is the **updater function**, which receives the latest value:

```tsx
setCount((previous) => previous + 1);
setCount((previous) => previous + 1); // now +2
```

> **Java analogy.** A lambda capturing an effectively-final local variable. The lambda sees the value at capture time. React's state is that captured local, once per render.

Rule of thumb: **if the new state derives from the old state, use the updater form.**

## The lifecycle, with hooks

A component mounts, updates, and unmounts. In modern React all three are expressed with `useEffect`.

1. **Mounting** — React calls your function for the first time and inserts the resulting DOM nodes.
   `useEffect(() => { ... }, [])` runs once, after the DOM is in place. Good for one-off setup.
2. **Updating** — props or state changed, React calls your function again and diffs the result.
   `useEffect(() => { ... }, [a, b])` runs after a render in which `a` or `b` changed.
3. **Unmounting** — the component is removed (for example, the user navigates away).
   The function _returned_ from an effect is the cleanup. It runs before unmount, and also before the effect re-runs.

```tsx
useEffect(() => {
  const subscription = service.subscribe();
  return () => subscription.unsubscribe(); // try-with-resources, essentially
}, []);
```

Forgetting cleanup is how you leak timers, sockets and listeners — the frontend equivalent of never closing a connection.

## The Rules of Hooks

Two rules, and one reason for both.

1. **Only call hooks at the top level** of a component or another hook. Never inside a condition, loop, or nested function.
2. **Only call hooks from React functions** — components, or custom hooks.

The reason: React does not know the _names_ of your hooks. It tracks them **by call order**. First `useState` in this component is slot 0, second is slot 1, and so on. Put a hook behind an `if` and the slots shift between renders, and state gets assigned to the wrong variable.

```tsx
// ❌ Slot numbering changes between renders
if (isLoggedIn) {
  const [name, setName] = useState('');
}

// ✅ Always call it; make the *value* conditional
const [name, setName] = useState('');
```

The `eslint-plugin-react-hooks` lint rule catches nearly all violations. Do not silence it.

---

# Part III — Modern JavaScript you actually need

React leans hard on ES6+ features. These are the ones that appear on every screen.

## Default vs named exports

```js
// --- Default export: one per file, imported under any name
const Button = () => <button />;
export default Button;

import MyButton from './Button'; // name is yours to choose

// --- Named exports: many per file, imported by exact name
export const PI = 3.14;
export const greet = () => 'hi';

import { PI, greet } from './utils';
import { useState, useEffect } from 'react'; // same mechanism
```

Both are `import`, so the braces are the tell: **braces = named, no braces = default**.

## Destructuring

```tsx
// Without
const Greeting = (props) => <h1>Hello, {props.name}</h1>;

// With — the props this component reads are visible in the signature
const Greeting = ({ name }) => <h1>Hello, {name}</h1>;

// With a default value
const Greeting = ({ name = 'stranger' }) => <h1>Hello, {name}</h1>;
```

Also works on arrays, which is why `useState` returns a pair:

```tsx
const [count, setCount] = useState(0);
```

## Spread

```tsx
// Objects: shallow copy plus overrides. Later keys win.
const updated = { ...user, name: 'Ada' };

// Arrays: a new array, not a mutation
const withNew = [...items, newItem];

// JSX: forward every property as a prop
<Profile {...user} />;
```

Spread is also how you respect immutability, which React requires:

```tsx
// ❌ React cannot tell anything changed — same object reference
todos.push(newTodo);
setTodos(todos);

// ✅ new array => new reference => re-render
setTodos([...todos, newTodo]);
```

> **Java analogy.** Treat state like an immutable value object: build a new instance instead of mutating fields. Mutating state in place is like mutating an object already used as a `HashMap` key.

## Array methods you will use constantly

| Method           | Returns                    | Backend analogy                                    |
| ---------------- | -------------------------- | -------------------------------------------------- |
| `map`            | New array, same length     | `stream().map(...).toList()`                       |
| `filter`         | New array, fewer items     | `stream().filter(...).toList()`                    |
| `find`           | First match or `undefined` | `stream().findFirst().orElse(null)`                |
| `some` / `every` | boolean                    | `anyMatch` / `allMatch`                            |
| `reduce`         | One accumulated value      | `stream().reduce(...)`                             |
| `sort`           | **Mutates in place** ⚠️    | `list.sort(...)` — copy first: `[...items].sort()` |

## Optional chaining, nullish coalescing, truthiness

```ts
user?.address?.city; // undefined instead of a TypeError
const name = input ?? 'default'; // only for null/undefined
const name2 = input || 'default'; // ⚠️ also replaces '' and 0
```

`??` versus `||` is a real bug source: `count || 10` turns a legitimate `0` into `10`. Prefer `??` unless you truly want the falsy check.

## Conditional rendering

```tsx
{
  isLoading && <Spinner />;
}
{
  /* render or nothing */
}
{
  error ? <Alert /> : <Content />;
}
{
  /* either/or */
}
{
  items.length > 0 && <List items={items} />;
}
{
  /* ⚠️ see below */
}
```

The trap: `&&` renders the _left_ value when it is falsy and not a boolean. `{items.length && <List />}` renders a literal `0` on screen when the array is empty. Always compare explicitly.

---

# Part IV — The chapters

Each chapter below matches a sidebar page in the companion app.

## 1. DOM vs. Virtual DOM (VDOM)

To be effective in React, it helps to understand the rendering engine. When state changes, React goes through a standard four-step cycle to keep the UI in sync with your data:

1. **State change** — you trigger an update by calling a state setter function, e.g., `setCount(1)`.
2. **Render** — React calls your component functions top-to-bottom and builds a brand new Virtual DOM tree (a lightweight blueprint of plain JavaScript objects).
3. **Diffing** — React compares (diffs) the new Virtual DOM tree with the previous one to compute the exact delta (minimum operations needed).
4. **Commit** — React surgically applies that minimal set of updates to the real DOM (e.g., updating a single text node instead of deleting and recreating the parent).

### Two Key Takeaways:

- **Render is cheap; commit is not:** Creating plain JavaScript object blueprints in the Virtual DOM is fast and low-overhead. Modifying the real DOM is very expensive because it forces the browser to recalculate layout and repaint pixels.
- **`key` defines identity (The Secret Weapon):** A `key` is not just for arrays—it defines element identity. React matches virtual nodes to real state using their key. By changing the key of a single component (e.g., `<UserForm key={userId} />`), you can force React to completely unmount and rebuild that element from scratch, instantly resetting all of its local state. This is a highly declarative way to reset form drafts or drawer state without messy synchronization effects!

## 2. JSX

JSX looks like HTML but is JavaScript. The build step turns it into function calls.

```tsx
const el = <h1 className="title">Hello</h1>;
// compiles to roughly:
// jsx('h1', { className: 'title', children: 'Hello' })
```

So JSX is a **type-safe builder DSL**. That explains all of its rules:

- `{}` embeds any JavaScript **expression** — not statements. `{a + b}`, `{list.map(...)}`, `{cond ? x : y}` are fine; `if` and `for` are not.
- Attributes are camelCase because they are object keys: `className` (not `class`, a reserved word), `onClick`, `htmlFor`, `tabIndex`.
- A component returns **one** root element. Need siblings? Wrap them in a fragment `<>...</>`, which renders no DOM node — an invisible container.
- Self-close every empty element: `<br />`, `<img />`.
- Comments inside JSX are `{/* like this */}`.

**`src/components/02-JSX/Welcome.tsx`**

```tsx
const name = 'Backend Engineer';

const Welcome = () => {
  return (
    <>
      <h1>Hello, {name}!</h1>
      <p>The time is: {new Date().toLocaleTimeString()}</p>
    </>
  );
};

export default Welcome;
```

Worth stating out loud: that `new Date()` runs on **every render**. JSX is not a template that is evaluated once — it is code.

## 3. Props

Props are the inputs to a component: one immutable object, passed by the parent.

- **Read-only.** Never assign to a prop. Data flows one way: down.
- **Anything can be a prop** — numbers, objects, functions, and even other components.
- **`children`** is the special prop holding whatever was nested inside your tags.

**`src/components/03-Props/Greeting.tsx`**

```tsx
import { ReactNode } from 'react';

interface GreetingProps {
  name: string;
  children: ReactNode; // "any renderable content"
}

const Greeting = ({ name, children }: GreetingProps) => {
  return (
    <div style={{ border: '1px solid gray', padding: '1rem' }}>
      <h2>Hello, {name}!</h2>
      {children}
    </div>
  );
};

export default Greeting;
```

**Usage — `src/pages/PropsPage.tsx`**

```tsx
<Greeting name={name}>
  <p>This is a message passed as a child.</p>
</Greeting>
<Greeting name="Grace">
  <button>Click me!</button>
</Greeting>
```

`GreetingProps` is the component's public contract. When you open an unfamiliar component in the real codebase, **read its props interface first** — it is the method signature.

### Props down, events up

A child never reaches into its parent. If a child needs to cause a change, the parent passes down a function:

```tsx
// Parent owns the state and passes an "event handler" down
const [query, setQuery] = useState('');
<SearchBox value={query} onChange={setQuery} />;

// Child just reports; it does not own the data
const SearchBox = ({ value, onChange }) => (
  <input value={value} onChange={(e) => onChange(e.target.value)} />
);
```

> **Java analogy.** Passing an observer/callback into a collaborator instead of letting it hold a reference back to you. Dependencies point one way; that is what keeps a large tree understandable.

This pattern has a name — **lifting state up**. When two siblings need the same data, it moves to their nearest common parent.

## 4. useState

`useState` adds a piece of state to a component.

- Call it at the top level. It returns a pair: the current value and a setter.
- Calling the setter schedules a re-render of this component and its children.
- Use the **updater form** whenever the new value derives from the old one.
- Updates are **batched**: several setter calls in one event handler produce one re-render.

**`src/components/04-useState/Counter.tsx`**

```tsx
import { Button, Typography, Box } from '@mui/material';
import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  console.log('count', count); // watch this in the browser console

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Button variant="contained" onClick={() => setCount((c) => c + 1)}>
        +
      </Button>
      <Typography>Count is {count}</Typography>
      <Button variant="contained" onClick={() => setCount((c) => c - 1)}>
        -
      </Button>
    </Box>
  );
};

export default Counter;
```

**Demo to run live:** open the console and click. The `console.log` fires once per render — proof that the function body re-executes top to bottom every time, and that `count` is a fresh constant each render rather than a mutated variable.

### Choosing what belongs in state

Beginners over-use state. Ask, in order:

1. **Can it be derived from existing state or props?** Then compute it during render — do not store it. A `filteredUsers` state that must be kept in sync with `users` and `query` is a bug waiting to happen.
2. **Is it server data?** Then it belongs in React Query (chapter 11), not `useState`.
3. **Does it need to be shared?** Lift it to a common parent, or use context (chapter 6).
4. **Does the UI need to change when it changes?** If not, it is a ref (chapter 12).

## 5. useEffect

An **effect** is anything that reaches outside React: network calls, subscriptions, timers, direct DOM work, logging.

```tsx
useEffect(fn, deps);
```

| Dependency array | When `fn` runs                                              |
| ---------------- | ----------------------------------------------------------- |
| `[]`             | Once, after mount                                           |
| `[a, b]`         | After mount, then after any render where `a` or `b` changed |
| omitted          | After **every** render — almost always a mistake            |

The dependency array is not a suggestion; it is the correctness contract. Anything from the component that the effect reads must be listed. The lint rule tells you what is missing — believe it.

**`src/components/05-useEffect/UserList.tsx`** — data fetching the manual way

```tsx
const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get<User[]>(URL);
        setUsers(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch users: ' + err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <List>
      {users.map((user) => (
        <ListItem key={user.id}>
          <ListItemText primary={user.name} secondary={user.email} />
        </ListItem>
      ))}
    </List>
  );
};
```

Note the shape: **three pieces of state for one request**, and an early return per state. Count what this version is still missing:

- no caching — remount refetches from scratch
- no deduplication — two components asking for the same data make two requests
- no cancellation — a slow response can land after the component unmounted, or two responses can arrive out of order
- no retry, no background refresh

That list is precisely what React Query exists to solve, which is why chapter 10 replaces this code. Learn this version anyway: you need to recognise it, and effects remain the right tool for **non-server** side effects.

> **Do not use an effect to sync state with state.** If `b` can be computed from `a`, compute it during render. An effect that watches `a` and calls `setB` renders twice and will eventually get out of sync.

## 6. useContext

Passing a prop through five intermediate components that do not use it is called **prop drilling**. Context is the escape hatch.

1. **Create** a context object with `createContext`.
2. **Provide** a value with `<MyContext.Provider value={...}>`.
3. **Consume** it anywhere below with `useContext(MyContext)`.

> **Java analogy.** Dependency injection. The provider is the container binding; `useContext` is the injection point. Anything below the provider can ask for the value without every layer in between knowing it exists.

### 5.1 A minimal shared value

**`src/components/06-useContext/SimpleContextExample.tsx`**

```tsx
interface GlobalStateContextType {
  isToggle: boolean;
  setIsToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalStateContext = createContext<GlobalStateContextType | null>(
  null,
);

export const ContextExample = () => {
  const [isToggle, setIsToggle] = useState(false);

  return (
    <GlobalStateContext.Provider value={{ isToggle, setIsToggle }}>
      <ChildToggle />
      <ChildDisplay />
    </GlobalStateContext.Provider>
  );
};

const ChildToggle = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('ChildToggle must be used within a Provider');
  }
  const { setIsToggle } = context;
  return (
    <Button onClick={() => setIsToggle((prev) => !prev)}>Toggle State</Button>
  );
};

const ChildDisplay = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('ChildDisplay must be used within a Provider');
  }
  return (
    <Typography>Current State: {context.isToggle ? 'ON' : 'OFF'}</Typography>
  );
};
```

Note the null check. The default value is `null`, so "used outside a provider" is a real, catchable condition — the equivalent of a missing bean. In production code this check is usually wrapped in a custom hook so it is written once:

```tsx
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) throw new Error('useGlobalState requires a provider');
  return context; // callers get a non-null type, for free
};
```

That is the pattern you will see most often in a real codebase: a context file, a provider component, and a `useX()` hook that hides the null check.

### 5.2 A theme switcher

The context object and the provider component live in **separate files**. That is not arbitrary: the dev server's hot reload gets confused by a module that exports both a component and a non-component, so the convention is to split them.

**`src/components/06-useContext/theme-context.ts`**

```tsx
export const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  mode: 'dark',
});
```

**`src/components/06-useContext/ThemeProvider.tsx`**

```tsx
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [mode, setMode] = useState<PaletteMode>('dark');

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
```

**`src/components/06-useContext/ThemeSwitcher.tsx`**

```tsx
const ThemeSwitcher = () => {
  const { mode, toggleTheme } = useContext(ThemeContext);

  return (
    <Box>
      Current Mode: {mode}
      <IconButton onClick={toggleTheme} color="inherit">
        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Box>
  );
};
```

**Wiring, in `src/main.tsx`** — providers wrap the app, outermost first. This is your application composition root:

```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
```

### The one caveat worth knowing

**Every consumer re-renders when the provider's value changes** — there is no partial subscription. So do not put fast-changing, unrelated values in one giant context. Split contexts by update frequency, and be careful with object literals:

```tsx
// ❌ new object every render => every consumer re-renders every time
<Ctx.Provider value={{ user, setUser }}>

// ✅ stable identity while the parts are unchanged
const value = useMemo(() => ({ user, setUser }), [user]);
<Ctx.Provider value={value}>
```

Context is for low-frequency, widely-read values: theme, current user, permissions, selected market. **It is not a cache for server data** — that is chapter 10.

## 7. useReducer

When state has several fields that change together, or the next state depends on the current one in non-trivial ways, `useState` starts to sprawl. `useReducer` centralises the transitions.

- You write a **reducer**: `(state, action) => newState`. A pure function.
- The hook gives you `[state, dispatch]`.
- Components `dispatch` an **action** describing _what happened_; the reducer decides _how state changes_.

> **Java analogy.** The Command pattern, or an event-sourced aggregate: `apply(state, event)` returns the next state and never mutates. In Kotlin the action type is naturally a `sealed class` with an exhaustive `when`.

**`src/components/07-useReducer/Todo.tsx`**

```tsx
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// A discriminated union: the `type` field narrows the shape of `payload`.
type Action =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'REMOVE_TODO'; payload: number };

const reducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    case 'REMOVE_TODO':
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

const Todo = () => {
  const [todos, dispatch] = useReducer(reducer, []);
  const [text, setText] = useState('');

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch({ type: 'ADD_TODO', payload: text });
      setText('');
    }
  };
  // ...
};
```

Three things to point out:

- **The discriminated union.** Inside `case 'TOGGLE_TODO'`, TypeScript knows `payload` is a `number`. Add a new action type and forget to handle it, and the compiler can be made to tell you.
- **Every branch returns a new array.** No `push`, no `splice`. Same immutability rule as `useState`.
- **The reducer is trivially testable.** It is a pure function with no React in it — call it with a state and an action and assert on the result. No rendering required. This is the main reason to reach for a reducer.

Note that transient UI state (`text`, the input value) stays in `useState`. It is fine — and normal — to mix both.

## 8. useMemo

`useMemo` caches the **result of a calculation** between renders.

```tsx
const value = useMemo(() => expensiveCalculation(a, b), [a, b]);
```

React re-runs the function only when a dependency changes; otherwise it hands back the previous value.

> **Java analogy.** `@Cacheable` on a pure method, keyed by its arguments. `by lazy` in Kotlin is close, except `useMemo` recomputes when the key changes.

**`src/components/08-useMemo/UseMemoDemo.tsx`** — the problem

```tsx
const ARRAY_SIZE = 29_999_999;

const initialItems = Array.from({ length: ARRAY_SIZE }, (_, i) => ({
  id: i,
  isSelected: i === ARRAY_SIZE - 1,
}));

const UseMemoDemo = () => {
  const [count, setCount] = useState(0);
  const [items] = useState(initialItems);

  // Scans 30M items on EVERY render — including renders caused by `count`
  const selectedItem = items.find((item) => item.isSelected);

  return (
    <Box>
      <Typography>Count: {count}</Typography>
      <Typography>Selected Item: {selectedItem?.id}</Typography>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
    </Box>
  );
};
```

**Demo to run live:** click Increment. The lag is obvious. The fix is one line:

```tsx
const selectedItem = useMemo(
  () => items.find((item) => item.isSelected),
  [items], // `count` is not a dependency, so incrementing no longer rescans
);
```

### When _not_ to use it

`useMemo` is not free: it costs a comparison of the dependency array and holds a reference. Wrapping every calculation makes code noisier and slightly slower.

Reach for it when:

- the calculation is genuinely expensive (large lists, heavy transforms), **or**
- the result is an object/array passed to a `React.memo` child or used as an effect dependency, where **reference identity** is what matters.

That second reason is the more common one in real code. Measure before optimising — the React DevTools Profiler will tell you what is actually slow.

## 9. useCallback

In JavaScript, functions are values. Every render creates a **new function object**, even if the code is identical:

```js
const a = () => {};
const b = () => {};
a === b; // false
```

Normally harmless. It matters when the function is a prop to a child wrapped in `React.memo`. `React.memo` skips re-rendering when props are equal — and a brand-new function is never equal to the old one, so the memo never hits.

**`src/components/09-useCallback/Search.tsx`**

```tsx
const Search = ({ handleSearch }: { handleSearch: (text: string) => void }) => {
  console.log('Search rendered'); // watch this
  return <TextField onChange={(e) => handleSearch(e.target.value)} />;
};

export default memo(Search); // "skip re-render if props are unchanged"
```

**The problem — `UseCallbackDemo.tsx`**

```tsx
const UseCallbackDemo = () => {
  const [users, setUsers] = useState(allUsers);

  // New function object on every render => memo on <Search /> is useless
  const handleSearch = (text: string) => {
    setUsers(
      allUsers.filter((u) => u.toLowerCase().includes(text.toLowerCase())),
    );
  };

  return (
    <Box>
      <Search handleSearch={handleSearch} />
      <Button onClick={() => setUsers(shuffle(allUsers))}>Shuffle</Button>
    </Box>
  );
};
```

**The fix — `UseCallbackDemoFixed.tsx`**

```tsx
const handleSearch = useCallback((text: string) => {
  setUsers(
    allUsers.filter((u) => u.toLowerCase().includes(text.toLowerCase())),
  );
}, []); // no dependencies: the function never needs to change
```

**Demo to run live:** open the console, click Shuffle. Unfixed version: `Search rendered` on every click. Fixed version: silence.

Note that `setUsers` is safe to omit from the dependencies — React guarantees setters are stable. Everything else the callback reads must be listed.

**The rule:** `useCallback` is only useful if the consumer cares about function identity — a `React.memo` child, a dependency array, or a custom hook's return value. Wrapping a plain `onClick` that goes straight onto a `<button>` achieves nothing.

## 10. React Query — server state

Go back to the `useEffect` version in chapter 5 and count the concerns it mixes: request lifecycle, loading flag, error flag, and the data itself, all hand-rolled in a component.

The insight behind React Query is that **server data is not application state — it is a cache of someone else's state**. Caches have their own concerns: staleness, invalidation, deduplication, retries, background refresh. You already know this from the backend; the mistake is re-implementing it per component.

> **Java analogy.** A repository wrapped in `@Cacheable` and `@Retryable`, with a TTL policy — except the cache is keyed per query and shared across the whole app.

What it gives you out of the box:

- **Caching**, keyed by a query key. Two components asking for the same key get one request.
- **Stale-while-revalidate**: cached data is shown immediately, then refreshed in the background.
- **Loading / error state** derived for you.
- **Retries** with backoff, and refetch on window refocus or reconnect.
- **Devtools** to inspect every cached query.

**`src/components/10-react-query/UserListWithReactQuery.tsx`**

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

// Just a function returning a promise. React Query does not care how you
// fetch — axios, fetch, a generated client, all fine.
const fetchUsers = async () => {
  const { data } = await axios.get<User[]>(URL);
  return data;
};

const UserList = () => {
  // One options object: the cache key, the function that fetches, and any
  // policy (staleTime, retry, enabled, ...) all in one place.
  const {
    data: users,
    isPending,
    isError,
    error,
  } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isPending) return <CircularProgress />;
  if (isError) return <Alert severity="error">{error.message}</Alert>;

  return (
    <List>
      {users?.map((user) => (
        <ListItem key={user.id}>
          <ListItemText primary={user.name} secondary={user.email} />
        </ListItem>
      ))}
    </List>
  );
};
```

Same behaviour as chapter 5, with three `useState` calls and an effect deleted.

### The query key is the API you need to understand

```tsx
useQuery({ queryKey: ['users'], queryFn: fetchUsers });
useQuery({ queryKey: ['users', userId], queryFn: () => fetchUser(userId) });
useQuery({
  queryKey: ['users', { page, filters }],
  queryFn: () => fetchUsers(page, filters),
});
```

The key is an array compared **structurally**, not by reference. It behaves exactly like a composite cache key: change any part and it is a different entry, fetched and cached separately. Two rules follow:

- **Every input to the request belongs in the key.** A key of `['users']` for a paginated request means page 2 overwrites page 1 in the cache. Same for a tenant, market, or locale that changes the response — leave it out and one tenant gets served another's cached data.
- **The key is also the invalidation handle.** `invalidateQueries({ queryKey: ['users'] })` matches by **prefix**, so it also invalidates `['users', 1]` and `['users', { page: 2 }]`. That prefix behaviour is why production codebases centralise key construction in one module instead of scattering literals — a typo'd key is a cache entry nothing ever invalidates, and nothing errors.

### Two options worth knowing on day one

```tsx
useQuery({
  queryKey: ['users', marketId],
  queryFn: () => fetchUsers(marketId),
  enabled: !!marketId, // don't run until the input exists
  staleTime: 60_000, // treat data as fresh for a minute
});
```

`enabled` is the **dependent query** pattern: this query waits for another piece of data. You will see it on nearly every real screen, because almost every request needs an id, a market, or a selection that is not available on first render.

### `isPending` vs `isFetching`

Two flags that look the same and are not:

- **`isPending`** — there is no data yet. Show a spinner.
- **`isFetching`** — a request is in flight, but cached data may already be on screen. Show a subtle indicator, not a spinner.

Rendering a full-page spinner on `isFetching` is the single most common way to make a React Query app feel _worse_ than the naive version: every background refresh blanks the screen. This distinction is the whole point of stale-while-revalidate.

### React Query v5 vs v3 — the mapping table

This app uses **v5**, published as `@tanstack/react-query`. Many production codebases are on **v3**, published as `react-query`. This is not a rename — v3 accepts positional arguments, v5 accepts only an options object.

| Concept                | v5 (`@tanstack/react-query`)                  | v3 (`react-query`)                          |
| ---------------------- | --------------------------------------------- | ------------------------------------------- |
| Package                | `@tanstack/react-query`                       | `react-query`                               |
| Devtools package       | `@tanstack/react-query-devtools`              | `react-query/devtools`                      |
| Query                  | `useQuery({ queryKey, queryFn })`             | `useQuery(queryKey, queryFn, options)`      |
| Mutation               | `useMutation({ mutationFn, onSuccess })`      | `useMutation(mutationFn, { onSuccess })`    |
| "No data yet" (query)  | `isPending`                                   | `isLoading`                                 |
| "In flight" (mutation) | `isPending`                                   | `isLoading`                                 |
| Invalidate             | `invalidateQueries({ queryKey: ['users'] })`  | `invalidateQueries(['users'])`              |
| Cache eviction timer   | `gcTime`                                      | `cacheTime`                                 |
| Query key type         | must be an array                              | array **or** a bare string                  |
| Per-query callbacks    | `onSuccess`/`onError` removed from `useQuery` | `onSuccess`/`onError` allowed on `useQuery` |

That last row matters more than it looks. In v3, a query can react to its own result inline — which is how many codebases raise an error toast from a failed fetch. v5 removed it, so error handling moves either into the component or into a **global** handler configured once on the `QueryClient`. If you see one repo dispatching errors per hook and another doing nothing visible per hook, that is the reason: the second one is handling it centrally.

Everything else in this chapter — keys, prefix invalidation, staleness, `enabled`, the pending/fetching distinction — is identical in both.

## 11. React Hook Form

Forms are where frontend state gets genuinely hard: field values, validation rules, error messages, dirty/touched tracking, and submit lifecycle.

The naive approach is a `useState` per field, re-rendering the whole form on every keystroke. React Hook Form avoids that by keeping values in a ref-based store and re-rendering only the fields that actually need it.

- **`useForm`** is the entry point. It returns `handleSubmit`, `control`, `register`, and `formState`.
- **`<Controller>`** connects a third-party input (like an MUI `TextField`) to the form.
- Validation rules are declared per field; errors land in `formState.errors`.

> **Java analogy.** `formState.errors` is your `BindingResult`, and the `rules` object is a Bean Validation annotation — `@NotNull`, `@Pattern` — declared inline instead of on a field.

**`src/components/11-react-hook-form/SimpleForm.tsx`**

```tsx
interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  subscribe: boolean;
}

const SimpleForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    // Always give every field a default. Otherwise an untouched field is
    // `undefined`, and React complains about switching a controlled input
    // to an uncontrolled one.
    defaultValues: { firstName: '', lastName: '', email: '', subscribe: false },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        rules={{ required: 'First name is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="First Name"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />

      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
};
```

Two details worth dwelling on, because they show up in every form you will read:

- **`{...field}`** spreads `value`, `onChange`, `onBlur`, `name` and `ref` onto the input in one go. This is spread syntax from Part III doing real work — without it you would wire five props by hand per field.
- **`handleSubmit(onSubmit)`** wraps your handler: it runs validation first, and calls `onSubmit` only with valid, typed data. If validation fails, your function is never called and `errors` is populated instead.

`useForm<IFormInput>()` is what makes `name="firstName"` a compile-time-checked string. Rename a field in the interface and every `name` and `errors.x` reference becomes a type error.

Two more hooks you will meet immediately in real forms:

- **`watch('fieldName')`** — subscribe to a field's value to drive conditional UI. It re-renders on every change, so use it deliberately.
- **`setValue('fieldName', v)`** — set a field programmatically, typically to cascade (choosing a country resets the city).

## 12. useRef

`useRef` gives you a mutable box that survives re-renders. Two distinct jobs:

1. **A handle on a DOM node** — for the small set of things that genuinely require the real element: focus, scroll, measure, play a video.
2. **A value that must change without re-rendering** — timer ids, subscription handles, "did I already do this", the previous value of something.

The defining property: **mutating `ref.current` does not trigger a render.** That is the whole difference from state.

|                        | `useState`             | `useRef`                              |
| ---------------------- | ---------------------- | ------------------------------------- |
| Change triggers render | ✅                     | ❌                                    |
| Value survives renders | ✅                     | ✅                                    |
| Read during render     | safe                   | avoid — it may be stale or mid-update |
| Use for                | anything the user sees | bookkeeping the user never sees       |

**`src/components/12-useRef/UseRefDemo.tsx`**

```tsx
const UseRefDemo = () => {
  // Job 1: a handle on a DOM node
  const inputRef = useRef<HTMLInputElement>(null);

  // Job 2: bookkeeping. The interval id is not UI — storing it in state
  // would schedule a render for a value nobody displays.
  const intervalRef = useRef<number | null>(null);
  const [seconds, setSeconds] = useState(0);

  const start = () => {
    if (intervalRef.current !== null) return;
    intervalRef.current = window.setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);
  };

  // Always clean up, or the callback keeps firing against a dead component
  useEffect(
    () => () => {
      if (intervalRef.current !== null)
        window.clearInterval(intervalRef.current);
    },
    [],
  );

  return (
    <>
      <TextField inputRef={inputRef} label="Search" />
      <Button onClick={() => inputRef.current?.focus()}>Focus the input</Button>
      <Typography>Elapsed: {seconds}s</Typography>
      <Button onClick={start}>Start</Button>
    </>
  );
};
```

`inputRef.current` is `null` until React has committed the DOM, which is why you only touch it inside event handlers or effects — never during render.

> **Java analogy.** A plain mutable field on an object that no framework is watching. Compare with state, which is a field with a change listener attached.

## 13. Custom hooks

A custom hook is **a function whose name starts with `use` and that calls other hooks**. There is no registration, no base class, no annotation. The naming convention is what lets the linter enforce the Rules of Hooks inside it.

This is the primary unit of reuse in React. Components are for reusing _markup_; hooks are for reusing _behaviour_.

**`src/components/13-custom-hooks/useDebouncedValue.ts`**

```ts
export const useDebouncedValue = <T>(value: T, delayMs = 400): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delayMs);
    // Cleanup cancels the pending timer whenever `value` changes again,
    // so only the last keystroke in a burst survives.
    return () => clearTimeout(timeout);
  }, [value, delayMs]);

  return debouncedValue;
};
```

Usage — the caller has no idea a timer exists:

```tsx
const [query, setQuery] = useState('');
const debouncedQuery = useDebouncedValue(query, 500);

// `query` drives the input; `debouncedQuery` drives the request.
const { data } = useQuery(['users', debouncedQuery], () =>
  search(debouncedQuery),
);
```

That four-line combination replaces the debounce-plus-cancel-plus-race-condition code you would otherwise hand-write on every search screen.

**`src/components/13-custom-hooks/useToggle.ts`** — returning a tuple, like `useState` does, so the caller names things:

```ts
export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((previous) => !previous), []);
  const setOn = useCallback(() => setValue(true), []);
  const setOff = useCallback(() => setValue(false), []);

  return [value, toggle, { setOn, setOff }] as const;
};
```

The critical thing to internalise: **calling a hook does not share state, it creates state.** Two components calling `useToggle()` get two independent booleans — like two instances of a class, not one static field. If you want shared state, that is context (chapter 6) or a query cache (chapter 9).

In a real codebase, custom hooks are where most of the interesting logic lives. When you open an unfamiliar screen, the component is often a thin shell and the answers are in the two or three hooks it calls.

## 14. Mutations and cache invalidation

`useQuery` reads. `useMutation` writes.

The difference is not cosmetic: reads can run automatically and be retried freely; writes must be triggered explicitly and are not safely retryable. So mutations do not run on mount — you call `mutate()`.

**`src/components/14-mutations/AddUser.tsx`**

```tsx
const AddUser = () => {
  const queryClient = useQueryClient();

  const { data: users, isPending } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const {
    mutate: addUser,
    isPending: isSaving,
    isError,
    error,
  } = useMutation<User, Error, NewUser>({
    mutationFn: createUser,
    onSuccess: () => {
      // "The users list is now out of date." React Query refetches it.
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setName('');
      setEmail('');
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // stop the browser's native form submit + reload
    addUser({ name, email });
  };
  // ...
};
```

The part that matters, and the part people get wrong:

**React Query cannot know what your write invalidated.** A POST to `/users` might affect `['users']`, `['users', 'count']`, and a dashboard summary. Nothing infers that — you declare it in `onSuccess`.

> **Java analogy.** `@CacheEvict` after a write. Same responsibility, same failure mode when someone forgets: stale reads with no error anywhere.

Symptoms of a missing invalidation are recognisable: "I saved it and the table didn't update, but it's there after I refresh." That is almost always a missing or mismatched `invalidateQueries` key.

`mutate` vs `mutateAsync`: `mutate` is fire-and-forget with callbacks; `mutateAsync` returns a promise you can `await`. Use `mutateAsync` when you need to sequence work after the write — and remember it rejects, so it needs a `try/catch`.

**Demo to run live:** open React Query Devtools, add a user, and watch the `['users']` query flip to stale and refetch.

## 15. Styling

There is no single way to style a React app, and most real codebases mix two or three. All the approaches below generate scoped class names at runtime — you almost never hand-write a global stylesheet.

**Three ideas transfer to every styling library, and they are the point of this chapter:**

1. **Styles are scoped to a component.** The library generates a unique class name, so you cannot accidentally restyle the rest of the app. There is no global namespace to be careful about.
2. **Values come from a theme, as named tokens** — `spacing(2)`, `surface.default`, `text.secondary` — not as hex codes and pixel counts. Tokens are what make light/dark mode and a consistent look possible at all. **Hardcoding a hex value is the single most common styling review comment.**
3. **Props can drive styles**, because the "stylesheet" is a function of the component's inputs.

The examples below use MUI, which is what this app is built on. Some codebases have **no MUI at all** — they use an in-house design system, and import `Box`, `Button` and `Spinner` from that instead. When that happens, the component names change and the token names change; the three ideas above do not. Whichever you are in, the working rule is the same: **use the library and the tokens the file already uses**, and never introduce a raw colour.

**`src/components/15-styling/StylingDemo.tsx`**

### A. The `sx` prop — one-off styles

```tsx
<Box sx={{ p: 2, borderRadius: 1, bgcolor: 'action.hover', display: 'flex', gap: 2 }}>
```

MUI-specific, and the most common thing you will read. Note `p: 2` is not pixels — it is **2 spacing units** from the theme (8px each by default), and `action.hover` is a **theme colour token**, so it adapts to light/dark automatically. Prefer tokens over hex codes; that is what keeps a dashboard visually consistent.

### B. `styled()` from MUI — reusable and theme-aware

```tsx
const AccentButton = muiStyled(Button)(({ theme }) => ({
  borderRadius: 999,
  paddingInline: theme.spacing(3),
  textTransform: 'none',
}));
```

Defines a new component once and reuses it. Reach for this when the same `sx` block appears three times.

### C. styled-components — props drive the CSS

```tsx
const StatusPill = styled.span<{ $tone: 'ok' | 'warn' }>`
  padding: 2px 10px;
  border-radius: 999px;
  color: #fff;
  background: ${({ $tone }) => ($tone === 'ok' ? '#2e7d32' : '#ed6c02')};
`;

<StatusPill $tone="ok">active</StatusPill>;
```

A separate library with the same idea. The `$` prefix is a styled-components convention meaning "this prop is styling input only — do not forward it to the DOM", which avoids React warning about an unknown HTML attribute.

**Rule of thumb:** `sx` for a one-off tweak, `styled()` when the look repeats. Follow whatever the file you are editing already does — consistency inside a screen beats your personal preference.

## 16. Routing

The router maps a URL to a component tree. Everything the user can navigate to is a route.

- **`<BrowserRouter>`** wraps the app once (see `src/main.tsx`).
- **`<Routes>` / `<Route>`** declare the mapping. Routes nest.
- **`<Outlet />`** is where a parent renders its matched child — a layout with a content placeholder.
- **`<Link>`** navigates without a full page reload. A plain `<a href>` would reload the app and lose all state.

> **Java analogy.** `<Route path="orders/:orderId">` is `@GetMapping("/orders/{orderId}")`, and a parent route with an `<Outlet />` is a layout template with a content region.

**`src/App.tsx`**

```tsx
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="jsx" element={<JsxPage />} />
    {/* ... */}
    <Route path="routing" element={<RoutingPage />}>
      <Route index element={<OrderList />} />
      <Route path="orders" element={<OrderList />} />
      <Route path="orders/:orderId" element={<OrderDetail />} />
    </Route>
  </Route>
</Routes>
```

`Layout` renders the app bar and sidebar once and drops the matched page into its `<Outlet />`. Nothing re-mounts the chrome when you navigate.

### Reading the URL

**`useParams`** — path variables, always `string | undefined`. The router cannot know the URL is well-formed, so you validate:

```tsx
const { orderId } = useParams();
const order = ORDERS.find((candidate) => candidate.id === orderId);
if (!order) return <Alert severity="warning">No order found.</Alert>;
```

**`useSearchParams`** — query string as state:

```tsx
const [searchParams, setSearchParams] = useSearchParams();
const status = searchParams.get('status') ?? 'all';

setSearchParams({ status: 'pending' }); // updates the URL, triggers a re-render
```

This is worth a deliberate pause. Putting filters, the current page, and the selected tab in the URL rather than in `useState` gives you shareable links, working browser back/forward, and state that survives a refresh — for free. Ask "should this be in the URL?" before adding another `useState` for a filter.

**`useNavigate`** — imperative navigation, for after a save or a cancel:

```tsx
const navigate = useNavigate();
navigate('/routing/orders'); // go somewhere
navigate(-1); // browser back
```

### React Router v6 vs v5 — the mapping table

This app uses **v6**. Plenty of production codebases are still on **v5**, and the API differs enough to be confusing. Same concepts, different names:

| Concept         | v6 (here)                            | v5 (older codebases)                                                    |
| --------------- | ------------------------------------ | ----------------------------------------------------------------------- |
| Route container | `<Routes>`                           | `<Switch>`                                                              |
| Route element   | `<Route path="x" element={<X />} />` | `<Route path="/x" component={X} />` or `<Route path="/x"><X /></Route>` |
| Path matching   | Exact by default                     | Prefix by default — needs `exact`                                       |
| Nested routes   | Nested `<Route>` + `<Outlet />`      | Render `<Switch>` again inside the child component                      |
| Relative paths  | Yes, relative to parent              | No, always absolute                                                     |
| Imperative nav  | `useNavigate()` → `navigate('/x')`   | `useHistory()` → `history.push('/x')`                                   |
| Go back         | `navigate(-1)`                       | `history.goBack()`                                                      |
| Path params     | `useParams()`                        | `useParams()` (same)                                                    |
| Query string    | `useSearchParams()`                  | `useLocation()` + parse `search` by hand                                |
| Current match   | `useMatch()`                         | `useRouteMatch()`                                                       |
| Redirect        | `<Navigate to="/x" replace />`       | `<Redirect to="/x" />`                                                  |

If you open a file with `useHistory`, `<Switch>`, `exact`, or `useRouteMatch`, you are in v5. Read this table right-to-left and everything else in this chapter still applies.

---

# Part V — Practice

## 17. Global state with Zustand

Chapter 6 solved sharing with context: wrap the tree in a provider, read it with a hook. That works, and for low-frequency values like theme or current user it is often all you need.

A **store library** solves the same problem differently: the state lives _outside_ the React tree, and components subscribe to it.

> **Java analogy.** Context is dependency injection — the container hands the value down the tree. A store is a **singleton service holding state** that components observe. Both give you "one value, many readers"; they differ in who owns the value and who gets told when it changes.

Three practical differences, and they are the reason store libraries exist:

|                          | Context (ch. 5)                    | Store (Zustand)                                  |
| ------------------------ | ---------------------------------- | ------------------------------------------------ |
| Setup                    | A provider must wrap the consumers | None — import the hook                           |
| Who re-renders on change | **Every** consumer of the context  | Only components whose **selected slice** changed |
| Usable outside React     | No                                 | Yes — `useCartStore.getState()`                  |

**`src/components/17-zustand/cartStore.ts`**

```ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      add: (item) =>
        // `set` returns a PARTIAL update, shallow-merged into the state.
        // Same immutability rule as useState: build a new array.
        set((state) => ({ items: [...state.items, { ...item, quantity: 1 }] })),

      remove: (id) =>
        set((state) => ({
          items: state.items.filter((candidate) => candidate.id !== id),
        })),

      clear: () => set({ items: [] }),
    }),
    { name: 'workshop-cart' }, // mirrors the store into localStorage
  ),
);
```

Notice that **state and the operations on it live together**, and `set` is the only way in. That is the same discipline as a service class with private fields and public methods — mutations cannot be scattered across the UI.

### Selectors are the whole trick

```tsx
// Reads one action. Never re-renders, because actions are stable.
const add = useCartStore((state) => state.add);

// A DERIVED value. Re-renders only when the computed total changes.
const totalItems = useCartStore((state) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0),
);
```

The function you pass is a **selector**: it says which part of the store this component depends on. Zustand re-renders the component only when that selection changes. Compare with context, where any change to the provider's value re-renders every consumer — the caveat at the end of chapter 6.

```tsx
// ❌ Subscribes to the whole store: re-renders on every unrelated change
const store = useCartStore();

// ✅ Subscribes to one slice
const items = useCartStore((state) => state.items);
```

Also note in the demo (`ZustandDemo.tsx`) that `CartBadge` and `CartContents` are **siblings** sharing state with no props and no provider between them. That is the payoff.

### The two things that will trip you up

**1. A store is global, so it persists between tests.** Module-level state is not reset by unmounting a component — you have to reset it yourself, exactly as you would reset a singleton or truncate a table between integration tests:

```tsx
beforeEach(() => {
  useCartStore.setState({ items: [] });
});
```

**2. It is not a place for server data.** A store is tempting for "the list of users I fetched", and it is the wrong tool: you would be re-implementing caching, staleness and invalidation by hand. Server data belongs in React Query (chapters 9 and 13); a store is for **client** state that many places need — a selected market, a draft, UI preferences, permissions.

## 18. Internationalisation (i18n)

If the product ships to more than one market, **every user-facing string comes from a translation file**, looked up by key. A literal string in JSX is a review comment.

> **Java analogy.** `ResourceBundle` with `messages_en.properties`, `messages_de.properties`. Same model: a key, a per-locale file, and a lookup at render time.

**`src/components/18-i18n/I18nDemo.tsx`**

```tsx
const { t, i18n } = useTranslation();

<Typography variant="h6">{t('demo.title')}</Typography>;

{
  /* Interpolation — never string concatenation */
}
<Typography>{t('demo.greeting', { name: 'Ada' })}</Typography>;

{
  /* Pluralisation — `count` picks the right form for the language */
}
<Typography>{t('demo.orders', { count: orders })}</Typography>;
```

Three rules that cover almost everything you will need:

1. **Never concatenate.** `t('greeting') + name` is broken: word order differs between languages, and some languages need the name declined. Use a placeholder: `t('demo.greeting', { name })`.
2. **Never branch on count yourself.** `count === 1 ? t('order') : t('orders')` assumes every language has exactly two plural forms. Several have one; several have more. Pass `count` and let the library choose, using the `_one` / `_other` key suffixes.
3. **Never build a key at runtime.** `t(\`status.${status}\`)` looks clever and makes the key impossible to find, impossible to lint, and easy to leave untranslated. Map explicitly instead.

### What this looks like in a real repo

- One file per language (`en.json`, `de.json`, …), often dozens of them, usually written by translators and synced by tooling — **you add keys to the source language only**.
- A `fallbackLng`, so a key missing in one language renders the fallback rather than the raw key. Switch the demo to Português and watch the dropdown label fall back to English.
- A provider at the app root (`<I18nextProvider>`), the same shape as every other provider in chapter 6.
- A check in CI that fails when a key is used but missing, or defined but unused.

The practical consequence for your first ticket: when you add a label, you add a key to the translation file and reference it. Two files, not one — and reviewers will notice if you skip the second.

## 19. Testing

### The stack

| Tool                      | Role                                                | Backend equivalent             |
| ------------------------- | --------------------------------------------------- | ------------------------------ |
| **Jest**                  | Test runner, assertions, mocks, coverage            | JUnit + Mockito + JaCoCo       |
| **jsdom**                 | A fake browser (`document`, `window`) inside Node   | An in-memory servlet container |
| **React Testing Library** | Render components, query the result, simulate users | MockMvc                        |
| **MSW**                   | Fake HTTP server at the network layer               | WireMock / MockServer          |

```bash
yarn test          # run everything once
yarn test:watch    # re-run on change (this is what you keep open)
yarn coverage      # writes coverage/ — open coverage/index.html
yarn test Counter  # only files matching "Counter"
```

### The philosophy that actually matters

> "The more your tests resemble the way your software is used, the more confidence they can give you."

Concretely: **query the DOM the way a user finds things**, and assert on what they would see. Do not assert on state values, prop values, or internal function calls. A test that knows the component uses `useReducer` breaks when you switch to `useState` — even though nothing observable changed.

Query priority, best to worst:

1. **`getByRole('button', { name: /submit/i })`** — how assistive technology sees the page. Use this by default.
2. **`getByLabelText(/email/i)`** — form fields. Also proves the label is wired to the input.
3. **`getByText(/no results/i)`** — static content.
4. **`getByTestId('row-42')`** — escape hatch. Fine, but it tests nothing a user can perceive.

Three variants of every query, and picking the wrong one is the most common beginner mistake:

| Prefix     | Not found      | Async      | Use for                                  |
| ---------- | -------------- | ---------- | ---------------------------------------- |
| `getBy…`   | throws         | no         | it should be there now                   |
| `queryBy…` | returns `null` | no         | asserting **absence**                    |
| `findBy…`  | throws         | yes, waits | it will appear **after** an async update |

```tsx
expect(screen.getByText('Ada')).toBeInTheDocument(); // now
expect(screen.queryByText('Ada')).not.toBeInTheDocument(); // absent
expect(await screen.findByText('Ada')).toBeInTheDocument(); // after a fetch
```

### A plain component test

**`src/components/04-useState/Counter.test.tsx`**

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

describe('Counter', () => {
  it('renders with initial count of 0', () => {
    render(<Counter />);
    expect(screen.getByText(/Count is 0/i)).toBeInTheDocument();
  });

  it('increments the count when "+" is clicked', () => {
    render(<Counter />);
    fireEvent.click(screen.getByRole('button', { name: '+' }));
    expect(screen.getByText(/Count is 1/i)).toBeInTheDocument();
  });
});
```

`describe`, `it` and `expect` are globals — no import needed, exactly like JUnit annotations being available in a test source set.

Prefer **`userEvent`** over `fireEvent` for anything a human does. `fireEvent.click` dispatches one synthetic event; `userEvent.click` reproduces the real sequence (pointer down, focus, mouse up, click) and so catches bugs `fireEvent` misses. `userEvent` is async — always `await` it.

### Testing a hook on its own

**`src/components/13-custom-hooks/useDebouncedValue.test.ts`**

```tsx
import { act, renderHook } from '@testing-library/react';
import { useDebouncedValue } from './useDebouncedValue';

describe('useDebouncedValue', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('only reports the last value of a burst of changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 500),
      { initialProps: { value: 'a' } },
    );

    rerender({ value: 'ab' });
    rerender({ value: 'abc' });

    act(() => {
      jest.advanceTimersByTime(499);
    });
    expect(result.current).toBe('a'); // not yet

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe('abc');
  });
});
```

`renderHook` mounts a throwaway component so the hook can run. `jest.useFakeTimers()` lets you control time instead of waiting for it. `act()` wraps the advance so React flushes the resulting renders — if you forget it, you get the "not wrapped in act(...)" warning and a stale assertion.

### Three ways to fake the network

This is the distinction worth taking away from the whole chapter. Which one your codebase uses is not a detail — it decides how every test in the repo is written.

**Option 1: mock the HTTP client.** Replace axios itself.

```tsx
jest.mock('axios');

jest.mocked(axios.get).mockResolvedValueOnce({ data: mockUsers });
```

Cheap and fast. But you are asserting against your mock: interceptors, base URLs, error mapping and serialisation are all bypassed. The equivalent of mocking your repository interface.

**Option 2: MSW — fake the server.** Real axios, real React Query cache, fake HTTP responses.

**`src/test/mocks/handlers.ts`**

```ts
import { rest } from 'msw';

export const handlers = [
  rest.get(API_URL, (_req, res, ctx) => res(ctx.json(mockUsers))),
  rest.post(API_URL, async (req, res, ctx) => {
    const body = await req.json<{ name: string; email: string }>();
    return res(ctx.status(201), ctx.json({ id: 11, ...body }));
  }),
];
```

**`src/test/setup.ts`** wires the lifecycle once for the whole suite:

```ts
import '@testing-library/jest-dom';
import { server } from './mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

`onUnhandledRequest: 'error'` fails the test if the code calls an endpoint nobody stubbed. That is deliberate: an accidental real network call in a unit test is a bug, not a warning.

Individual tests override a single endpoint when they need an unhappy path — and `resetHandlers()` undoes it afterwards, so tests stay independent:

```tsx
server.use(
  rest.post(API_URL, (_req, res, ctx) =>
    res(ctx.status(500), ctx.json({ message: 'nope' })),
  ),
);
```

Compare `UserListWithReactQuery.test.tsx` (mocked axios) with `UserListWithReactQuery.msw.test.tsx` (MSW) side by side in the repo — same component, same assertions, two philosophies.

**Option 3: inject a fake client.** Not in this repo, but common — and the one that will feel most familiar to you.

Some codebases never import an HTTP library into a component at all. Instead an API client object is **passed in**, and the modules that use it take it as a parameter:

```ts
// The service takes its transport as a constructor argument
class AvailabilityService {
  constructor(private readonly api: ApiClient) {}

  getRegions() {
    return this.api.call({ path: '/regions' });
  }
}

// The hook receives the client and memoises the service
export const useRegions = (api: ApiClient) => {
  const service = useMemo(() => new AvailabilityService(api), [api]);

  return useQuery({
    queryKey: ['regions'],
    queryFn: () => service.getRegions(),
  });
};
```

Testing it needs no HTTP faking at all — you hand it a fake:

```ts
const fakeApi = {
  call: jest.fn().mockResolvedValue({ status: 200, data: { regions: [] } }),
} as unknown as ApiClient;

const { result } = renderHook(() => useRegions(fakeApi), { wrapper });
```

That is **constructor injection with a Mockito mock**, in TypeScript. If you have written Spring services, this is the pattern you already know, and it is why some frontend codebases have no MSW: the seam for substitution is the injected client, not the network.

**Which to use?** Follow your codebase — mixing styles in one repo is worse than either choice. If you are choosing fresh: prefer **MSW** when components call HTTP directly (it exercises the most real code), and **injection** when there is already a client object to pass. Option 1 is the fallback for a quick unit test, not a house style.

### Rendering a component that needs providers

A component using React Query or the router will throw if rendered bare. Give it the providers it needs — this helper appears in every real test file:

```tsx
const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }, // no retries: fail fast
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};
```

A **fresh client per test**, or one test's cached data leaks into the next and you get failures that depend on test order.

For routed components, `MemoryRouter` keeps history in memory instead of the URL bar. To exercise `useParams`, declare the route pattern — the param name comes from the route, not from a prop:

```tsx
render(
  <MemoryRouter initialEntries={['/routing/orders/1002']}>
    <Routes>
      <Route path="/routing/orders/:orderId" element={<OrderDetail />} />
    </Routes>
  </MemoryRouter>,
);
```

### Jest gotchas you will hit in your first week

**1. `jest.mock` is hoisted.** The call is lifted above your imports, so its factory cannot reference variables declared later in the file. Use `jest.mocked(...)` inside the test body instead.

**2. Mocking a default export needs `__esModule: true`.** This one costs people an afternoon:

```tsx
// ❌ "Element type is invalid: ... got: object"
jest.mock('./Greeting', () => ({
  default: jest.fn(() => <div />),
}));

// ✅
jest.mock('./Greeting', () => ({
  __esModule: true,
  default: jest.fn(() => <div />),
}));
```

Your TypeScript uses ES module syntax, Jest runs CommonJS. `__esModule: true` is the flag that tells the interop layer "the `default` key is a real default export, do not wrap this object again." Named exports do not need it.

**3. Partial mocks use `jest.requireActual`** — keep the real module, replace one export. Mockito's `spy()`, not `mock()`:

```tsx
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: jest.fn(() => <div data-testid="mock-outlet" />),
}));
```

**4. Fake timers and `userEvent` must agree.** `userEvent` schedules its own timers, so tell it yours are fake or it will hang:

```tsx
const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
```

**5. "not wrapped in act(...)"** means state updated outside React's knowledge. Usually the fix is `await screen.findBy…` or `await waitFor(...)` instead of a synchronous assertion — not adding `act` by hand.

### What to test

- **Do** test: what renders for a given input, what happens on user interaction, loading/error/empty branches, and pure logic (reducers, helpers, hooks) directly.
- **Don't** test: exact class names, CSS values, third-party library internals, or that `useState` was called.
- **Reducers and helpers first.** They are pure functions with no React in them and give the best confidence per line of test.

### End-to-end tests with Cypress

Everything above runs in **jsdom** — a JavaScript implementation of a browser. It is fast and it is a simulation: no real layout, no real paint, no real navigation. Some bugs only exist in a real browser.

**Cypress** drives an actual Chrome against the actual app. Not every codebase has it; where it does, this is roughly the split:

|                 | Jest + RTL                     | Cypress                                     |
| --------------- | ------------------------------ | ------------------------------------------- |
| Runs in         | jsdom                          | a real browser                              |
| Scope           | one component or hook          | a whole user journey across screens         |
| Speed           | seconds for the suite          | minutes                                     |
| Backend analogy | unit / slice test with MockMvc | integration test against a deployed service |
| How many        | hundreds                       | a handful of critical paths                 |

The shape of a spec will look familiar — it is the same "act like a user" philosophy, with a chainable API instead of `await`:

```ts
describe('region list', () => {
  beforeEach(() => {
    // Stub the API so the test is deterministic. Same purpose as an MSW
    // handler, at the browser level.
    cy.intercept('GET', '**/api/regions', { fixture: 'regions.json' }).as(
      'regions',
    );
    cy.visit('/regions');
    cy.wait('@regions');
  });

  it('opens a region', () => {
    cy.findByRole('link', { name: /North/ }).click();
    cy.findByRole('heading', { name: /North/ }).should('be.visible');
  });
});
```

Three conventions that matter more than the API:

- **Stub the network** (`cy.intercept` with a fixture). A test that depends on a shared environment's data fails for reasons that have nothing to do with your change.
- **Page objects.** Selectors live in one file per screen (`cypress/page-objects/…`), not inlined in every spec. Otherwise a renamed button breaks twenty specs and you fix the same string twenty times.
- **Keep the suite small and about journeys.** "Can a user create a region and see it in the list" belongs in Cypress. "Does this input show a validation error" belongs in a Jest test — it is a hundred times faster there.

Practically: `yarn cy:open` for the interactive runner while writing a spec, and CI runs the headless equivalent. If a Cypress test fails and a hundred Jest tests pass, suspect wiring — routing, providers, a real request nobody stubbed — rather than component logic.

## 20. Browser tooling

Two extensions carry most of the debugging weight.

**React Developer Tools** ([Chrome Web Store](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkafgcmiapbop)) adds two panels:

- **Components** — the live component tree, with props, state and hook values for whatever you select. You can edit them in place to test a branch without touching code. This is your debugger's variables pane.
- **Profiler** — record an interaction and see which components re-rendered and why. Use it _before_ adding `useMemo` or `useCallback`. Guessing at performance is how you end up with a memoised codebase that is still slow.

**React Query Devtools** is already mounted in `src/main.tsx` and appears as a floating badge in dev. It shows every cached query, its key, its state (fresh / fetching / stale / inactive), and the cached payload. When someone says "the table didn't refresh after saving", this panel answers the question in about five seconds: find the query, check whether it went stale, check whether the key you invalidated actually matches the key in the list.

Also worth knowing in plain DevTools: the **Network** tab (filter by Fetch/XHR, then check the request payload and response), and the **Console** — React's warnings there are unusually good. "Each child in a list should have a unique key" and "cannot update a component while rendering a different component" are pointing at real bugs, not noise.

## 21. AI-assisted development

Two MCP servers are worth setting up on day one. Both plug your AI coding assistant into something it otherwise cannot see: your designs, and your running browser.

> **What is MCP?** The Model Context Protocol is an open standard that lets an AI assistant call external tools and read external data. An "MCP server" is a small process exposing a set of tools; your assistant (Claude Code, Cursor, Windsurf, Zed, …) is the client. Adding one is closer to registering a plugin than to installing a library.

### 20.1 Figma — design to code

Figma exposes an MCP server so an assistant can read the actual design instead of guessing from a screenshot: frame structure, auto-layout, spacing, colour and typography **variables**, component names, and exported assets.

**Setup, in outline:**

1. In the **Figma desktop app**, enable the Dev Mode MCP server (Preferences → the MCP / Dev Mode server option). It listens on localhost. A remote server at `https://mcp.figma.com/mcp` is also available and uses OAuth instead of the desktop app.
2. Register it with your assistant. In Claude Code that is `claude mcp add`, or an entry in the project's MCP config file. Then confirm with `claude mcp list`.
3. Requires a Figma seat with Dev Mode access.

Endpoints and menu labels have moved more than once — check Figma's current MCP documentation rather than trusting a hardcoded URL in a workshop script, including this one.

**The workflow:**

1. Select the frame or component in Figma, copy the link to selection (the URL carries a `node-id`).
2. Paste it into your prompt: _"implement this screen"_.
3. The assistant pulls layout, tokens and assets for that node and writes the component.

**Where this goes wrong, and how to prevent it.** Left alone, an assistant reproduces the design as one-off CSS with hardcoded hex values — pixel-perfect and completely off-system. Say what to reuse:

> "Implement this frame using our existing MUI components and theme tokens. Do not add hardcoded colours or spacing values; use the theme. Reuse the existing `StatusPill` and `PageHeader` components rather than creating new ones."

For components you use repeatedly, **Code Connect** makes this durable: it records a mapping from a Figma component to the code component that implements it, so the assistant reaches for your `Button` rather than inventing one. Worth doing for a design system's core set, not for every one-off frame.

Realistic expectation: this gets you a good first draft of structure and styling. Behaviour, state, data wiring and accessibility still need you.

### 20.2 Kaboom — browser evidence for your assistant

[Kaboom AI DevTools](https://github.com/brennhill/Kaboom-Browser-AI-Devtools-MCP) streams what is happening in your browser into the assistant: console output, failing requests **with response bodies**, uncaught exceptions with stack traces, WebSocket traffic, Web Vitals, DOM queries, and accessibility/security audits. It can also drive the browser (navigate, click, type) and generate a Playwright test from a recorded session.

The point is the shortening of the debugging loop. Instead of reproducing a bug, screenshotting the console, copy-pasting a stack trace and describing the failing request, you say _"the save button does nothing"_ and the assistant reads the console error, the 422 response body and the DOM state itself.

**Setup:**

```bash
# macOS / Linux
curl -sSL https://raw.githubusercontent.com/brennhill/Kaboom-Browser-AI-Devtools-MCP/STABLE/scripts/install.sh | bash
```

```powershell
# Windows
irm https://raw.githubusercontent.com/brennhill/Kaboom-Browser-AI-Devtools-MCP/STABLE/scripts/install.ps1 | iex
```

The installer drops a single Go binary, writes the extension to `~/KaboomAgenticDevtoolExtension`, and auto-configures detected MCP clients. Then:

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. **Load unpacked** → select `~/KaboomAgenticDevtoolExtension`.
4. Restart your AI tool so it picks up the new MCP server.

It binds to localhost only and processes data locally (AGPL-3.0). No remote debugging port needed.

**Before you install it on a work machine:** read the install script rather than piping an unread script to a shell, and remember that a loaded browser extension can see page content — including any authenticated internal tool you have open. Check your organisation's policy on browser extensions and MCP servers first, and keep it pointed at localhost development, not production dashboards with real customer data.

### 20.3 Using an assistant well on a stack you don't know yet

You are in the situation where AI help is most valuable and most dangerous: it is faster than you at producing React, and you cannot yet tell good React from plausible React. Things that actually help:

- **Ask for explanations before edits.** "Walk me through the data flow in this component: what triggers a re-render, and where does the server data come from?" This is the fastest way to learn an unfamiliar screen, and it costs nothing if the answer is wrong.
- **State your versions — every session.** This is the highest-value sentence you can type, and the failure it prevents is silent-ish: code that looks right and does not compile. Assistants default to the newest API they know, so on an established codebase expect `useNavigate` in a v5 file and object-syntax `useQuery` in a v3 file. Open with a one-liner:

  > "This project uses React Router v5, react-query v3, and TypeScript 4.2. Match the file I point you at."

  On a recent codebase the drift runs the other way — it will reach for MUI and inline `rules` when the repo uses an in-house design system and Zod schemas. Either way: **name the libraries, or point at a neighbouring file and say "match this."**

- **Warn it about local wrappers.** The failure mode from chapter 22: an assistant imports `useForm` straight from the library, because that is what the library's docs say, and silently drops whatever your in-house wrapper added. If your repo wraps something, say so up front.
- **Give it the conventions in writing.** A project instructions file (`CLAUDE.md`, `AGENTS.md`, or equivalent) describing the folder layout, the styling approach and the testing patterns turns generic React into code that matches your repo. Doing this once pays back constantly — and if your repo already has one, read it yourself: it is usually the best short description of the codebase that exists.
- **Make the tools the referee, not yourself.** `yarn lint`, `yarn build` (type check) and `yarn test` are exactly the safety net you need while your own review instincts are still forming. Run them on every AI-authored change before you read the diff closely.
- **Ask for the test first, then verify it fails for the right reason.** A generated test that passes against broken code is worse than no test.
- **Watch for confident invention.** Props that do not exist, hooks from the wrong library version, and MUI components with plausible-but-wrong names are the standard failure modes. The type checker catches most of them, which is another argument for never using `any`.
- **Review the diff, not the explanation.** The summary is usually right about intent and occasionally wrong about what the code does.

## 22. What differs in a real production codebase

This app is deliberately clean and deliberately current. Real codebases are neither, in two different directions: an **established** one carries years of accumulated decisions, and a **recent** one is built on libraries this workshop only mentions. None of it changes the concepts — but recognising it saves you an hour of confusion each time.

### Where the API genuinely differs

These are the ones that will make copied code fail to compile. Each has a mapping table earlier in this script.

| Job                  | This app                                    | An established codebase                | Mapping table |
| -------------------- | ------------------------------------------- | -------------------------------------- | ------------- |
| Routing              | React Router v6 (`<Routes>`, `useNavigate`) | v5 (`<Switch>`, `useHistory`, `exact`) | chapter 16    |
| Data fetching        | `@tanstack/react-query` v5 (object syntax)  | `react-query` v3 (positional args)     | chapter 10    |
| HTTP faking in tests | MSW v1 (`rest`, `res(ctx.json())`)          | MSW v1, or an injected client          | chapter 19    |

And in the other direction, things a **recent** codebase may use that this app does not:

| Job             | You may find                                     | What it replaces                                                                                                                                 |
| --------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| UI components   | An in-house design system                        | MUI imports — same ideas, different names (chapter 15)                                                                                           |
| Form validation | A schema library (Zod) via `@hookform/resolvers` | Inline `rules` per field (chapter 11). The schema is the single source of truth for shape _and_ validation, closest to Bean Validation on a DTO  |
| Query errors    | One global handler on the `QueryClient`          | Per-hook `onError` — required in v5, which removed query-level callbacks                                                                         |
| HTTP            | An injected SDK/client object                    | Direct `axios` calls (chapter 19, option 3)                                                                                                      |
| Test transform  | `@swc/jest`                                      | `ts-jest`. **`@swc/jest` strips types without checking them** — a type error will not fail your tests, only the separate typecheck step. Run it. |
| E2E             | Cypress                                          | nothing (chapter 19)                                                                                                                             |
| Client state    | Zustand or another store                         | Context (chapter 17)                                                                                                                             |
| Observability   | Error/tracing SDKs wrapping the app root         | nothing                                                                                                                                          |
| Permissions     | A rules library gating routes and buttons        | nothing — expect a `ProtectedRoute`-style wrapper                                                                                                |

### Things both kinds of codebase do

| You will see                                                 | Instead of                     | Notes                                                                                                                                              |
| ------------------------------------------------------------ | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **webpack** (or a plugin host build)                         | Vite                           | Slower dev server, different config file. Same React.                                                                                              |
| **Path aliases** (`import X from '@src/x'`)                  | relative paths                 | Configured in `tsconfig` **and** duplicated in the Jest config. If an import resolves in the editor but not in tests, that mapping is the culprit. |
| **A query-key factory module**                               | inline `['users', id]`         | One place that builds every cache key. Use it — do not hand-write keys.                                                                            |
| **Feature flags**                                            | unconditional code             | Screens gated per environment or per market. A missing screen is a flag before it is a bug.                                                        |
| **i18n** (`useTranslation`, `t('key')`)                      | literal strings                | Chapter 18.                                                                                                                                        |
| **A vertical slice per feature**                             | one folder per layer           | `api` + `types` + query hooks + a listing page + a form + tests, all together. Learn one slice and you can read them all.                          |
| **Providers / contexts for cross-cutting state**             | inline `createContext`         | Current user, market/locale, error handling, permissions.                                                                                          |
| **Data grids and virtualised lists**                         | a plain `<table>`              | Large APIs for sorting, filtering, inline editing.                                                                                                 |
| **Older TypeScript** (established)                           | latest                         | Newer syntax (`satisfies`, some template-literal tricks) simply will not compile.                                                                  |
| **Aliased dependencies** (`import … from 'some-lib-latest'`) | plain package names            | A `package.json` alias, usually to run two versions during a migration. Check the alias before assuming a package is missing.                      |
| **In-house wrappers around libraries**                       | importing the library directly | The dangerous one — see below.                                                                                                                     |
| **300–800 line components**                                  | 40-line examples               | The logic usually lives in the custom hooks the component calls. Read those first.                                                                 |

### The one that actually bites: in-house wrappers

Mature codebases wrap libraries. A repo may export its own `useForm` that adds unsaved-changes protection, its own `queryClient` with extra invalidation behaviour, or its own themed component over a design-system primitive.

Importing "the normal way" then **silently loses that behaviour** — no error, no warning, no failing test. Before you import anything from a library in an unfamiliar repo, grep for it: if there is a local wrapper, use the wrapper. This is also the single thing AI assistants get wrong most often, because the library's own docs say to import from the library.

### Two orientation habits for a large unfamiliar screen

1. **Read the props interface and the hook calls at the top.** That tells you the inputs and where data comes from before you read any JSX.
2. **Find the pure logic.** Files like `helpers.ts`, `mappers.ts` or `*Utils.ts` are plain functions with no React in them — the easiest place to start contributing, and the easiest to test.

## 23. Wrap-up

### Key takeaways

- **`UI = f(state)`.** You write `f`; React owns the DOM.
- **Render must be pure**, and state is a **snapshot** per render. Use the updater form when the next value derives from the previous one.
- **Immutability is not a style choice** — a new reference is how React detects change.
- **Props down, events up.** One-way data flow is what keeps a big tree tractable.
- **Server state is a cache**, not application state. React Query owns it; `useState` does not, and neither does a store.
- **A write must declare what it invalidated.** Nothing infers it for you.
- **Hooks are the unit of logic reuse**; components are the unit of markup reuse.
- **Test what the user perceives**, and fake the network at the seam your codebase already uses.
- **Reach for `useMemo` / `useCallback` after measuring**, not before.
- **Use the tokens, the wrapper, and the translation file the repo already has.** Almost every review comment you get in your first month will be one of those three.

### Exercises

Work in this repo. All of them are small and all of them are testable.

1. **A derived value.** On the `useState` page, add a "Reset" button and a `Typography` that reads "even" or "odd". Compute the parity during render — resist adding a second `useState` for it.
2. **An effect with cleanup.** Add a component that shows the window width and updates on resize. Register the listener in `useEffect`, remove it in the cleanup. Then delete the cleanup and watch the listeners accumulate in DevTools.
3. **A custom hook.** Extract exercise 2 into `useWindowWidth()`, and write a test for it with `renderHook`.
4. **A mutation.** On the mutations page, add a delete button per user, wired to a `useMutation` that DELETEs and then invalidates `['users']`. Add an MSW handler for the DELETE and a test that asserts the row disappears.
5. **URL as state.** On the routing page, add a text filter that lives in the query string, so `?q=ada` survives a refresh and is shareable.
6. **Store vs context.** On the Zustand page, add a `discount` field and a `setDiscount` action, and display the discounted total in `CartBadge`. Then answer in one sentence why this belongs in the store rather than in React Query.
7. **A translated label.** Add a key to all three languages in the i18n chapter and render it. Then delete it from one language and confirm the fallback behaviour rather than a raw key on screen.
8. **Read a real screen.** Open the largest component in the codebase you are joining. Do not change anything. Write down: which hooks it calls, where its server data comes from, which of its state could be derived instead of stored, and which imports come from a local wrapper rather than the library. Bring the list to your next 1:1.

### Where to go next

- **The official docs, `react.dev`** — genuinely excellent, and structured around the mental model rather than API lists. Read "You Might Not Need an Effect" and "Thinking in React".
- **React Query docs** — the guides on query keys and invalidation are the highest-value pages for dashboard work.
- **React 19+** — Server Components, `use()`, and the compiler are changing the performance story. Not needed for a client-side dashboard today, but worth knowing the direction.

---

## Appendix A — Jest for JUnit users

| Jest                                   | JUnit / Mockito                            |
| -------------------------------------- | ------------------------------------------ |
| `describe('X', () => {})`              | test class                                 |
| `it('does y', () => {})` / `test(...)` | `@Test`                                    |
| `beforeEach` / `afterEach`             | `@BeforeEach` / `@AfterEach`               |
| `beforeAll` / `afterAll`               | `@BeforeAll` / `@AfterAll`                 |
| `it.each([...])`                       | `@ParameterizedTest`                       |
| `it.skip` / `it.only`                  | `@Disabled` / running a single test        |
| `expect(a).toBe(b)`                    | `assertSame` (`Object.is`)                 |
| `expect(a).toEqual(b)`                 | `assertEquals` (deep/structural)           |
| `expect(fn).toThrow()`                 | `assertThrows`                             |
| `expect(spy).toHaveBeenCalledWith(x)`  | `verify(mock).method(x)`                   |
| `jest.fn()`                            | `mock()` of a functional interface         |
| `jest.mock('module')`                  | `mock(Class.class)`                        |
| `jest.requireActual` + spread          | `spy()`                                    |
| `jest.spyOn(obj, 'method')`            | `spy()` on one method                      |
| `mockResolvedValue(x)`                 | `when(...).thenReturn(completedFuture(x))` |
| `jest.useFakeTimers()`                 | a controllable `Clock`                     |
| `--coverage`                           | JaCoCo                                     |

## Appendix B — Frontend glossary

| Term                       | Meaning                                                           |
| -------------------------- | ----------------------------------------------------------------- |
| **DOM**                    | The browser's in-memory tree of the page                          |
| **VDOM**                   | React's lightweight JS description of the intended UI             |
| **Reconciliation**         | Diffing two VDOM trees to compute minimal DOM updates             |
| **Render**                 | Calling your component functions to produce a VDOM                |
| **Commit**                 | Applying the computed changes to the real DOM                     |
| **Mount / unmount**        | A component entering / leaving the tree                           |
| **Hook**                   | A `use*` function that plugs into React's per-component state     |
| **Prop drilling**          | Threading a prop through components that do not use it            |
| **Lifting state up**       | Moving state to the nearest common parent of its consumers        |
| **Controlled input**       | An input whose value comes from React state                       |
| **Uncontrolled input**     | An input that keeps its own value in the DOM                      |
| **Fragment** (`<>…</>`)    | A wrapper that renders no DOM element                             |
| **Portal**                 | Rendering into a different DOM node (modals, tooltips)            |
| **Memoisation**            | Caching a value or function identity between renders              |
| **Stale-while-revalidate** | Show cached data immediately, refresh in the background           |
| **Transpile / bundle**     | Compile TS/JSX to JS; combine modules into shippable files        |
| **HMR**                    | Hot Module Replacement — swap changed code without a full reload  |
| **jsdom**                  | A DOM implementation in Node, used for tests                      |
| **Store**                  | State living outside the React tree that components subscribe to  |
| **Selector**               | A function saying which slice of a store a component depends on   |
| **Design token**           | A named theme value used instead of a raw hex or pixel count      |
| **Interpolation** (i18n)   | Filling a placeholder in a translated string                      |
| **E2E test**               | A test driving a real browser through a whole user journey        |
| **MCP**                    | Model Context Protocol — how an AI assistant calls external tools |

## Appendix C — Repo map

```
src/
├── main.tsx                     Entry point. Providers wrap the app here.
├── App.tsx                      Route table.
├── components/
│   ├── Layout/                  App bar + sidebar + <Outlet />
│   ├── 02-JSX/ … 18-i18n/       One folder per chapter
│   └── */*.test.tsx             Tests live next to what they test
├── pages/                       One page per sidebar entry
└── test/
    ├── setup.ts                 jest-dom matchers + MSW lifecycle
    ├── fileMock.cjs             Stub for image/font imports
    └── mocks/
        ├── handlers.ts          Default MSW responses
        └── server.ts            The fake server instance

jest.config.cjs                  Test runner config
tsconfig.jest.json               TS settings used only by ts-jest
vite.config.ts                   Dev server + production build
eslint.config.js                 Lint rules (app rules + test-file rules)
```
