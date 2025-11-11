# React Workshop

## Introduction

Welcome! This workshop is designed for experienced backend engineers who are new to frontend development, specifically React. Our goal is to quickly get you up to speed with the core concepts of React and familiarize you with the patterns and libraries we use in our own projects.

### What is TypeScript?

- **JavaScript with Syntax for Types:** TypeScript is a superset of JavaScript that adds optional static typing. This means you can add type definitions to your variables, function parameters, and return values.
- **Catch Errors Early:** By defining types, many common programming errors (like passing a string where a number is expected) can be caught during development (compile-time) rather than at runtime. This significantly improves code reliability and reduces bugs.
- **Improved Tooling:** TypeScript enables powerful tooling features like autocompletion, intelligent refactoring, and inline documentation in IDEs, making development faster and more efficient.
- **Better Code Readability and Maintainability:** Explicit types make code easier to understand, especially in large codebases or when working in teams. It acts as a form of living documentation.
- **Gradual Adoption:** You can introduce TypeScript gradually into an existing JavaScript project, as valid JavaScript code is also valid TypeScript code.

### What is React?

- **A JavaScript library for building user interfaces.** It's not a full-blown framework like Angular. It focuses on the "view" layer of your application.
- **Component-Based:** You build encapsulated components that manage their own state, then compose them to make complex UIs. This makes code reusable and easier to reason about.
- **Declarative:** You describe _what_ you want the UI to look like for a given state, and React takes care of updating the actual DOM efficiently. You don't manually manipulate the DOM (e.g., `document.getElementById(...)`).
- **"Learn Once, Write Anywhere":** The same concepts apply to web (with React DOM) and mobile (with React Native).

### Our Tech Stack

- **Build Tool:** Vite (a super-fast modern alternative to Create React App/Webpack)
- **Language:** TypeScript
- **Package Manager:** Yarn
- **UI Library:** Material-UI (MUI)
- **Data Fetching:** React Query + Axios
- **Forms:** React Hook Form
- **Routing:** React Router
- **Testing:** Vitest (runner), React Testing Library (utilities)

---

## React Internals: A Deeper Dive

Before we jump into writing components, it's helpful to understand some of the core concepts that make React work. As a backend engineer, you can think of this as the "architecture" or "engine" that powers the library.

### What is the DOM?

- **DOM stands for Document Object Model.** When a browser loads a web page, it creates a model of that page. The DOM is that model, structured as a tree of objects.
- **Analogy:** Think of it as a live, in-memory representation of the HTML, much like how you might parse a JSON or XML document into a tree of objects on the backend.
- **The Problem:** Directly manipulating the DOM is slow. Every time you change an element, the browser might have to do a lot of work to recalculate the layout and styles of the page (this is called "reflow" and "repaint"). Doing this frequently for many small changes is a major performance bottleneck.

### The Virtual DOM (VDOM): React's Secret Sauce

This is where React's cleverness comes in. Instead of touching the slow, real DOM directly every time something changes, React uses a **Virtual DOM**.

- **Analogy:** Think of the Virtual DOM as a **blueprint** or a **staging environment**. It's a lightweight copy of the real DOM tree, kept in memory as a plain JavaScript object. It's fast to create and manipulate because it's not tied to the browser's rendering engine.

The process, known as **Reconciliation**, works like this:

1.  **State Change:** Your application's state changes (e.g., a user clicks a button, and you call `setCount(1)`).
2.  **New VDOM:** React creates a brand new Virtual DOM tree that represents what the UI _should_ look like after the change.
3.  **Diffing:** React then compares ("diffs") this new VDOM tree with the previous VDOM tree it has in memory.
4.  **Calculate Changes:** It figures out the most efficient, minimal set of changes needed to make the real DOM match the new VDOM.
5.  **Batch Update:** React takes these calculated changes and updates the real DOM in a single, optimized batch.

This process is far more performant because React minimizes the expensive direct interactions with the browser's DOM.

### The React Component Lifecycle (with Hooks)

A component has a "lifecycle" – it gets created (mounted), it can be updated with new data, and it eventually gets destroyed (unmounted). In modern React, we manage this lifecycle using hooks within our functional components.

1.  **Mounting Phase (Birth):**
    - **What it is:** The component is being created and inserted into the DOM for the first time.
    - **How it works:** React calls your component function for the first time to get its JSX. It then creates the real DOM nodes and adds them to the page.
    - **The Hook:** `useEffect(() => { ... }, [])` (with an empty dependency array) runs _after_ the component has mounted. This is the perfect place for one-time setup, like fetching initial data from an API.

2.  **Updating Phase (Life):**
    - **What it is:** The component is re-rendering because its state or props have changed.
    - **How it works:** The state or props of your component are updated. React calls your component function again to get the new JSX. It then runs the "diffing" algorithm described above to efficiently update the real DOM.
    - **The Hook:** `useEffect(() => { ... }, [dependency1, dependency2])` runs _after_ a render, but _only if_ one of its dependencies has changed. This is useful for reacting to specific prop or state changes.

3.  **Unmounting Phase (Death):**
    - **What it is:** The component is being removed from the DOM (e.g., the user navigates to a different page).
    - **How it works:** React removes the component's DOM nodes from the page.
    - **The Hook:** The **cleanup function** returned from a `useEffect` is executed just before the component is unmounted. This is crucial for preventing memory leaks by cleaning up subscriptions, timers, or other resources.

      ```javascript
      useEffect(() => {
        const subscription = someService.subscribe();

        // This cleanup function runs on unmount
        return () => {
          subscription.unsubscribe();
        };
      }, []);
      ```

---

## Essential Modern JavaScript (for React)

React heavily uses features from modern JavaScript (ES6+). Understanding these will make reading and writing React code much easier.

### Default vs. Named Exports

A file (or "module") can export its code in two main ways:

- **Default Export:**
  - A file can have **only one** default export.
  - You can import it with any name you choose.
  - **Syntax:**

    ```javascript
    // MyComponent.js
    const MyComponent = () => <div>Hello</div>;
    export default MyComponent;

    // App.js
    import MyCoolComponent from './MyComponent'; // Imported with a different name
    ```

- **Named Exports:**
  - A file can have **many** named exports.
  - You must import them using their exact names inside curly braces `{}`.
  - This is how you import most hooks from React.
  - **Syntax:**

    ```javascript
    // utils.js
    export const PI = 3.14;
    export const GREETING = 'Hello';

    // App.js
    import { PI, GREETING } from './utils';
    import { useState, useEffect } from 'react'; // Same pattern!
    ```

### Object Destructuring

Destructuring is a convenient way to extract properties from objects and bind them to variables. It's used extensively with component props.

- **Without Destructuring:**

  ```jsx
  const Greeting = (props) => {
    return <h1>Hello, {props.name}</h1>;
  };
  ```

- **With Destructuring:**
  ```jsx
  // Unpacking the 'name' property directly in the function signature
  const Greeting = ({ name }) => {
    return <h1>Hello, {name}</h1>;
  };
  ```
  This is much cleaner and makes it immediately clear which props the component expects.

### Spread Syntax (`...`) for Props

The spread syntax (`...`) can be used to pass all the properties of an object as props to a component at once. This is extremely useful for wrapping other components or when integrating with libraries like `react-hook-form`.

- **Basic Example:**

  ```jsx
  const user = {
    firstName: 'John',
    lastName: 'Doe',
  };

  // Instead of this:
  <Profile firstName={user.firstName} lastName={user.lastName} />

  // You can do this:
  <Profile {...user} />
  ```

- **Real-World Example (from `react-hook-form`):**
  When using a `<Controller>`, the `render` prop gives you a `field` object. This object contains properties like `value`, `onChange`, `onBlur`, etc. Instead of wiring them up one by one, we can spread them directly onto the `TextField`.
  ```jsx
  <Controller
    name="firstName"
    control={control}
    render={({ field }) => (
      // The ...field passes all necessary props to the TextField
      <TextField {...field} label="First Name" />
    )}
  />
  ```

---

## 1. Core Concepts & First Components

Let's dive into the fundamental building blocks of any React application.

### JSX: A Syntax Extension for JavaScript

JSX looks like HTML, but it's actually JavaScript. It's "syntactic sugar" for creating React elements.

- You can embed any JavaScript expression within curly braces `{}`.
- HTML attributes are written in `camelCase` (e.g., `className` instead of `class`, `onClick` instead of `onclick`).
- A component must return a **single** root element. If you need to return multiple elements, wrap them in a fragment (`<>...</>`).

**Example (`src/components/01-JSX/Welcome.tsx`):**

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

### Components & Props

Components are like JavaScript functions. They accept arbitrary inputs called "props" (short for properties) and return React elements.

- **Props:** Pass data from a parent component to a child component. They are read-only.
- **Composition:** Components can be composed of other components.

**Example (`src/components/02-Props/Greeting.tsx`):**

```tsx
import { ReactNode } from 'react';

interface GreetingProps {
  name: string;
  children: ReactNode;
}

const Greeting = ({ name, children }: GreetingProps) => {
  return (
    <div
      style={{ border: '1px solid gray', padding: '1rem', margin: '1rem 0' }}
    >
      <h2>Hello, {name}!</h2>
      {children}
    </div>
  );
};

export default Greeting;
```

**Usage in `PropsPage.tsx`:**

```tsx
import { Typography, Divider, Box } from '@mui/material';
import Greeting from '../components/02-Props/Greeting';

const PropsPage = () => {
  const name = 'Marcelo';
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        2. Props
      </Typography>
      <Typography paragraph>
        Props (short for properties) are how you pass data from a parent
        component to a child component. <b>They are read-only</b>.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Greeting name={name}>
        <p>This is a message passed as a child.</p>
      </Greeting>
      <Greeting name="Marcelo">
        <button>Click me!</button>
      </Greeting>
    </Box>
  );
};

export default PropsPage;
```

---

## 2. State and Lifecycle

Now that we can pass data down with props, let's see how a component can manage its own internal data that changes over time.

### State: `useState` Hook

The `useState` hook is the most fundamental hook. It lets you add a "state variable" to your component.

- **Call `useState`:** At the top level of your component to declare a state variable.
- **It returns a pair:** The current state value and a function that lets you update it.
- **Updating State:** When you call the update function (e.g., `setCount(1)`), React will re-render your component and all of its children.
- **Functional Updates:** If the new state depends on the previous state, pass a function to the setter (e.g., `setCount(prevCount => prevCount + 1)`). This is safer and avoids issues with stale state.

**Example (`src/components/03-useState/Counter.tsx`):**

```tsx
import { Button, Typography, Box } from '@mui/material';
import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  console.log('count', count);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Button
        variant="contained"
        onClick={() => setCount((prevCount) => prevCount + 1)}
      >
        +
      </Button>
      <Typography>Count is {count}</Typography>
      <Button
        variant="contained"
        onClick={() => setCount((prevCount) => prevCount - 1)}
      >
        -
      </Button>
    </Box>
  );
};

export default Counter;
```

### Side Effects: `useEffect` Hook

The `useEffect` hook lets you perform side effects in function components. This is the React equivalent of lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

What are side effects?

- Fetching data from an API
- Setting up a subscription (e.g., to a WebSocket)
- Manually changing the DOM (though this is rare)

`useEffect` takes two arguments: a function to run, and a "dependency array".

- `useEffect(() => { ... }, [])`: Runs **once** after the initial render (like `componentDidMount`).
- `useEffect(() => { ... }, [value1, value2])`: Runs after the initial render, and **any time** `value1` or `value2` changes.
- `useEffect(() => { ... })`: (No dependency array) Runs after **every single render**. Use this sparingly!
- **Cleanup:** The function you pass to `useEffect` can optionally return another function. React will run this cleanup function when the component unmounts, or before re-running the effect. This is perfect for unsubscribing or cleaning up resources.

**Example (`src/components/04-useEffect/UserList.tsx`):**

```tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
} from '@mui/material';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Define the async function to fetch data
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get<User[]>(
          'https://jsonplaceholder.typicode.com/users',
        );
        setUsers(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch users: ' + err);
      } finally {
        setLoading(false);
      }
    };

    // Call the function
    fetchUsers();

    // The empty dependency array [] means this effect runs once when the component mounts.
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

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

export default UserList;
```

### A Better Way: `react-query`

While `useEffect` is great for understanding side effects, for server state (like API data), it can lead to a lot of boilerplate code for handling loading, errors, caching, re-fetching, etc.

In our projects, we use **React Query**. It's a powerful library that simplifies data fetching, caching, and synchronization. It replaces all the `useState` and `useEffect` logic for server state with a simple hook. We will see an example of this later.

---

## 3. Advanced Hooks & Patterns

Let's explore more hooks that help manage complex state and performance.

### Sharing State with `useContext`

Sometimes you have state that needs to be accessible by many components at different levels in the component tree. Passing props down through many layers can be cumbersome (this is called "prop drilling").

`useContext` lets you "subscribe" to a "context", allowing you to read a value from a provider higher up in the tree without passing it down explicitly. We will explore two examples of `useContext` usage.

The pattern is:

1.  **Create a Context:** Use `createContext` to create a context object.
2.  **Provide the Context:** Use the `<MyContext.Provider value={...}>` component to wrap a part of your component tree. Any component inside this provider can now access the value.
3.  **Consume the Context:** Use the `useContext(MyContext)` hook in a child component to read the value.

---

#### Example 5.1: Simple Global State

This example demonstrates a basic global state that can be toggled by a child component and displayed by another, all without prop drilling.

**`src/components/05-useContext/SimpleContextExample.tsx`**

```tsx
import { createContext, useState, useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface GlobalStateContextType {
  isToggle: boolean;
  setIsToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const GlobalStateContext = createContext<GlobalStateContextType | null>(
  null,
);

export const ContextExample = () => {
  const [isToggle, setIsToggle] = useState(false);

  return (
    <GlobalStateContext.Provider value={{ isToggle, setIsToggle }}>
      <Box sx={{ border: '1px solid lightgray', p: 2, borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          Parent Component
        </Typography>
        <ChildToggle />
        <ChildDisplay />
      </Box>
    </GlobalStateContext.Provider>
  );
};

const ChildToggle = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error(
      'ChildToggle must be used within a GlobalStateContext.Provider',
    );
  }
  const { setIsToggle } = context;
  return (
    <Box sx={{ my: 1 }}>
      <Button variant="contained" onClick={() => setIsToggle((prev) => !prev)}>
        Toggle State
      </Button>
    </Box>
  );
};

const ChildDisplay = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error(
      'ChildDisplay must be used within a GlobalStateContext.Provider',
    );
  }
  const { isToggle } = context;

  return (
    <Box sx={{ my: 1 }}>
      <Typography>Current State: {isToggle ? 'ON' : 'OFF'}</Typography>
    </Box>
  );
};
```

---

#### Example 5.2: A Theme Switcher

To ensure compatibility with React's Fast Refresh feature, we separate the context creation from the provider component. This is a common pattern to avoid issues where non-component exports can break Fast Refresh.

**`src/components/05-useContext/theme-context.ts`**

```tsx
import { createContext } from 'react';
import type { PaletteMode } from '@mui/material';

interface ThemeContextType {
  toggleTheme: () => void;
  mode: PaletteMode;
}

// 1. Create the context with a default value
export const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  mode: 'dark',
});
```

**`src/components/05-useContext/ThemeProvider.tsx`**

```tsx
import { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import type { PaletteMode } from '@mui/material';
import { ThemeContext } from './theme-context'; // Import from the new file

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [mode, setMode] = useState<PaletteMode>('dark');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
```

**`src/components/05-useContext/ThemeSwitcher.tsx`**

```tsx
import { useContext } from 'react';
import { IconButton, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { ThemeContext } from './theme-context'; // Import from the new file

const ThemeSwitcher = () => {
  // 3. Consume the context
  const { mode, toggleTheme } = useContext(ThemeContext);

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      Current Mode: {mode}
      <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Box>
  );
};

export default ThemeSwitcher;
```

**`src/main.tsx` (Setup)**

```tsx
// ... imports
import { ThemeProvider } from './components/05-useContext/ThemeProvider'; // Import from the new file

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
```

---

### Managing Complex State with `useReducer`

For more complex state logic, `useState` can become cumbersome. When you have state that involves multiple sub-values, or when the next state depends on the previous one in complex ways, `useReducer` is a great alternative.

It's very similar to the reducer pattern you might know from Redux or other state management libraries.

- **`useReducer`** accepts a **reducer function** and an **initial state**.
- It returns the current **state** and a **`dispatch` function**.
- You call `dispatch` with an **action** object. React passes the current state and the action to your reducer function.
- Your **reducer function** calculates the next state and returns it.

This pattern is great because it decouples the "what happened" (the action) from the "how it changes the state" (the reducer logic), making your components cleaner and the state logic easier to test.

**Example (`src/components/06-useReducer/Todo.tsx`):**

```tsx
import { useReducer, useState } from 'react';
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Box,
  Typography,
} from '@mui/material';
import { Delete } from '@mui/icons-material';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// An action is an object describing what happened.
type Action =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'REMOVE_TODO'; payload: number };

// The reducer function specifies how the state changes in response to an action.
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

  return (
    <Box>
      <Typography variant="h6">My Todo List</Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          label="New Todo"
          variant="outlined"
          size="small"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleAddTodo}>
          Add
        </Button>
      </Box>
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() =>
                  dispatch({ type: 'REMOVE_TODO', payload: todo.id })
                }
              >
                <Delete />
              </IconButton>
            }
          >
            <Checkbox
              checked={todo.completed}
              onChange={() =>
                dispatch({ type: 'TOGGLE_TODO', payload: todo.id })
              }
            />
            <ListItemText
              primary={todo.text}
              sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Todo;
```

---

## 4. Routing with React Router

Most real-world applications aren't just a single page. `react-router-dom` is the standard library for handling routing in React applications.

### Core Components

- **`<BrowserRouter>`:** Wraps your entire application to enable routing. We've added this in `src/main.tsx`.
- **`<Routes>`:** A container for a collection of `<Route>` elements.
- **`<Route>`:** Declares a mapping between a URL path and a component.
- **`<Link>`:** Used to create navigation links. It's better than a regular `<a>` tag because it prevents a full page reload.
- **`<Outlet>`:** In a layout route, this component renders the matched child route.

We have refactored our workshop app to use a layout with a sidebar for navigation.

**Example (`src/App.tsx`):**

```tsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import JsxPage from './pages/JsxPage';
import PropsPage from './pages/PropsPage';
import UseStatePage from './pages/UseStatePage';
import UseEffectPage from './pages/UseEffectPage';
import UseContextPage from './pages/UseContextPage'; // The new parent page
import ThemeSwitcherPage from './pages/ThemeSwitcherPage'; // The renamed page
import SimpleContextPage from './pages/SimpleContextPage'; // The new simple example page
import UseReducerPage from './pages/UseReducerPage';
import ReactQueryPage from './pages/ReactQueryPage';
import ReactHookFormPage from './pages/ReactHookFormPage';
import UseMemoPage from './pages/UseMemoPage';
import UseCallbackPage from './pages/UseCallbackPage';

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="jsx" element={<JsxPage />} />
        <Route path="props" element={<PropsPage />} />
        <Route path="usestate" element={<UseStatePage />} />
        <Route path="useeffect" element={<UseEffectPage />} />
        <Route path="usecontext" element={<UseContextPage />}>
          <Route index element={<ThemeSwitcherPage />} />
          <Route path="themeswitcher" element={<ThemeSwitcherPage />} />
          <Route path="simple-example" element={<SimpleContextPage />} />
        </Route>
        <Route path="usereducer" element={<UseReducerPage />} />
        <Route path="usememo" element={<UseMemoPage />} />
        <Route path="usecallback" element={<UseCallbackPage />} />
        <Route path="react-query" element={<ReactQueryPage />} />
        <Route path="react-hook-form" element={<ReactHookFormPage />} />
      </Route>
    </Routes>
  );
};

export default App;
```

---

## 5. Modern Data Fetching with React Query

As mentioned before, using `useEffect` for data fetching can be verbose. **React Query** is the standard in modern React for managing server state.

### Why use React Query?

- **Caching:** It automatically caches data. If you request the same data again, you get the cached version instantly while it re-fetches in the background (stale-while-revalidate).
- **Less State Management:** It manages loading, error, and data states for you. No more `useState` for `isLoading`, `error`, and `data`.
- **Background Updates:** It can automatically re-fetch data when the user re-focuses the window, keeping data fresh.
- **Devtools:** It comes with amazing developer tools to inspect your queries and their cached data.

The core hook is `useQuery`. It takes a unique **query key** and a **fetcher function**.

**Example (`src/components/07-react-query/UserListWithReactQuery.tsx`):**

```tsx
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useQuery } from 'react-query';

interface User {
  id: number;
  name: string;
  email: string;
}

// The fetcher function can be any function that returns a promise
const fetchUsers = async () => {
  const { data } = await axios.get<User[]>(
    'https://jsonplaceholder.typicode.com/users',
  );
  return data;
};

const UserList = () => {
  // Use the useQuery hook
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery<User[], Error>(['users'], () => fetchUsers());

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">{error.message}</Alert>;
  }

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

export default UserList;
```

Notice how much cleaner this is compared to the `useEffect` version. All the state management for loading and errors is handled by the hook.

---

## 6. Handling Forms with React Hook Form

Forms are a fundamental part of any web application. Managing form state (values, errors, validation) can be complex. `react-hook-form` is a library that makes this much easier and more performant.

### Core Concepts

- **Uncontrolled Components:** It's built on uncontrolled components, meaning it doesn't re-render the component on every keystroke, which is great for performance.
- **`useForm` Hook:** This is the main hook you'll use. It gives you methods like `handleSubmit`, `control`, and the form `formState`.
- **`<Controller>` Component:** When using UI libraries like Material-UI, the `<Controller>` component is the easiest way to connect your form fields to `react-hook-form`.

**Example (`src/components/08-react-hook-form/SimpleForm.tsx`):**

```tsx
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

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
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      subscribe: false,
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}
    >
      <Typography variant="h6">Simple Form</Typography>

      <Controller
        name="firstName"
        control={control}
        rules={{ required: 'First name is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="First Name"
            variant="outlined"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        )}
      />

      <Controller
        name="lastName"
        control={control}
        rules={{ required: 'Last name is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Last Name"
            variant="outlined"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Invalid email address',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />

      <Controller
        name="subscribe"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Subscribe to newsletter"
          />
        )}
      />

      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
};

export default SimpleForm;
```

---

## 7. Performance Optimization Hooks

As your application grows, you might encounter performance issues. React is very fast, but unnecessary re-renders can slow things down. `useMemo` and `useCallback` are the primary tools for optimizing your components.

### Memoizing Values with `useMemo`

The `useMemo` hook is used to memoize (cache) the result of a calculation between re-renders.

- **When to use it:** When you have a computationally expensive calculation in your component that you don't want to re-run on every single render.
- **How it works:** You provide `useMemo` with a function that performs the calculation and a dependency array. React will only re-run the function if one of the dependencies has changed. Otherwise, it returns the cached value from the previous render.

**Example (`src/components/07-useMemo/UseMemoDemo.tsx`):**

```tsx
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';

const ARRAY_SIZE = 29_999_999;

const initialItems = Array.from({ length: ARRAY_SIZE }, (_, i) => ({
  id: i,
  isSelected: i === ARRAY_SIZE - 1,
}));

const UseMemoDemo = () => {
  const [count, setCount] = useState(0);
  const [items] = useState(initialItems);

  const selectedItem = items.find((item) => item.isSelected);

  return (
    <Box sx={{ border: '1px solid lightgray', p: 2, borderRadius: 1 }}>
      <Typography variant="h5" gutterBottom>
        Count: {count}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Selected Item: {selectedItem?.id}
      </Typography>
      <Button variant="contained" onClick={() => setCount(count + 1)}>
        Increment
      </Button>
    </Box>
  );
};
export default UseMemoDemo;
```

### Memoizing Functions with `useCallback`

In JavaScript, functions are objects. This means that every time a component re-renders, any functions defined inside it are technically new functions, even if their code is identical.

This becomes a problem when you pass a function as a prop to a child component that is optimized with `React.memo`. The child will re-render unnecessarily because it's receiving a "new" function prop every time.

`useCallback` solves this by memoizing the function itself. It returns the same function reference between renders, unless one of its dependencies changes.

- **When to use it:** When passing callbacks to optimized child components (`React.memo`).
- **How it works:** You provide `useCallback` with a function and a dependency array. It returns a memoized version of that function.

---

#### Example: The Problem (without `useCallback`)

Here, the `Search` component is memoized with `React.memo`. However, because `handleSearch` is recreated on every render of `UseCallbackDemo`, the `Search` component re-renders unnecessarily.

**`src/components/08-useCallback/Search.tsx`**

```tsx
import { TextField } from '@mui/material';
import { memo } from 'react';

const Search = ({ handleSearch }: { handleSearch: (text: string) => void }) => {
  console.log('Search rendered');
  return (
    <TextField
      label="Search"
      variant="outlined"
      size="small"
      onChange={(e) => handleSearch(e.target.value)}
      fullWidth
    />
  );
};

export default memo(Search);
```

**`src/components/08-useCallback/UseCallbackDemo.tsx`**

```tsx
import { Box, Button, List, ListItem, ListItemText } from '@mui/material';
import { useState } from 'react';
import Search from './Search';

const allUsers = [
  'Marcelo',
  'Nisha',
  'Eugene',
  'Pasha',
  'Nasir',
  'Eunhee',
  'Pradnya',
  'Pranav',
];

const shuffle = (array: string[]) =>
  array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

const UseCallbackDemo = () => {
  const [users, setUsers] = useState(allUsers);
  console.log('users', users);

  const handleSearch = (text: string) => {
    const filteredUsers = allUsers.filter((user) =>
      user.toLowerCase().includes(text.toLowerCase()),
    );
    setUsers(filteredUsers);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Search handleSearch={handleSearch} />
        <Button variant="contained" onClick={() => setUsers(shuffle(allUsers))}>
          Shuffle
        </Button>
      </Box>
      <List>
        {users.map((user) => (
          <ListItem key={user}>
            <ListItemText primary={user} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UseCallbackDemo;
```

---

#### Example: The Solution (with `useCallback`)

By wrapping `handleSearch` with `useCallback`, we ensure that the `Search` component only re-renders when its props actually change (i.e., when `handleSearch` itself changes, which it won't unless its dependencies change).

**`src/components/08-useCallback/UseCallbackDemoFixed.tsx`**

```tsx
import { Box, Button, List, ListItem, ListItemText } from '@mui/material';
import { useCallback, useState } from 'react';
import Search from './Search';

const allUsers = [
  'Marcelo',
  'Nisha',
  'Eugene',
  'Pasha',
  'Nasir',
  'Eunhee',
  'Pradnya',
  'Pranav',
];

const shuffle = (array: string[]) =>
  array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

const UseCallbackDemo = () => {
  const [users, setUsers] = useState(allUsers);

  const handleSearch = useCallback((text: string) => {
    const filteredUsers = allUsers.filter((user) =>
      user.toLowerCase().includes(text.toLowerCase()),
    );
    setUsers(filteredUsers);
  }, []);

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Search handleSearch={handleSearch} />
        <Button variant="contained" onClick={() => setUsers(shuffle(allUsers))}>
          Shuffle
        </Button>
      </Box>
      <List>
        {users.map((user) => (
          <ListItem key={user}>
            <ListItemText primary={user} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UseCallbackDemo;
```

---

## 8. Testing React Components

Testing is an integral part of building robust and maintainable applications. In React, we want to ensure our components behave as expected, respond correctly to user interactions, and don't break when changes are introduced.

### Our Testing Stack

- **Test Runner:** [**Vitest**](https://vitest.dev/)
  - A fast, Vite-native test framework. It's configured to work seamlessly with our Vite setup.
- **Testing Utility:** [**React Testing Library (RTL)**](https://testing-library.com/react)
  - The recommended way to test React components. Its guiding principle is: "The more your tests resemble the way your software is used, the more confidence they can give you." This means we focus on testing user behavior rather than internal implementation details.

### Philosophy of React Testing Library

Instead of testing component internals (like state or prop values directly), RTL encourages you to:

- **Query elements** the way a user would (e.g., by visible text, accessible role, label text).
- **Simulate user interactions** (e.g., clicks, typing).
- **Assert on the visible output** or changes in the DOM that a user would perceive.

This approach leads to more resilient tests that don't break easily when you refactor your component's internal logic, as long as the user-facing behavior remains the same.

### Basic Testing Example

Let's create a simple test for our `Counter` component (`src/components/03-useState/Counter.tsx`).

**`src/components/03-useState/Counter.test.tsx`**

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter'; // Import the component to test
import { expect } from 'vitest'; // Vitest's global expect

describe('Counter', () => {
  it('renders with initial count of 0', () => {
    render(<Counter />);
    // Use screen.getByText to find the element containing "Count is 0"
    expect(screen.getByText(/Count is 0/i)).toBeInTheDocument();
  });

  it('increments the count when "+" button is clicked', () => {
    render(<Counter />);
    const incrementButton = screen.getByRole('button', { name: '+' });
    fireEvent.click(incrementButton);
    expect(screen.getByText(/Count is 1/i)).toBeInTheDocument();
  });

  it('decrements the count when "-" button is clicked', () => {
    render(<Counter />);
    const decrementButton = screen.getByRole('button', { name: '-' });
    fireEvent.click(decrementButton);
    expect(screen.getByText(/Count is -1/i)).toBeInTheDocument();
  });
});
```

### Running Tests

To run your tests, you can use the command:

```bash
yarn test
# or
npm test
```

This will execute all test files (typically ending in `.test.ts` or `.spec.ts`) and report the results.

### Using the Vitest UI

For a more interactive and visual way to run your tests, you can use the Vitest UI. This opens a web interface in your browser where you can see your test results, filter tests, and get detailed information about each test run.

To launch the UI, run:

```bash
yarn test:ui
```

This is a great tool for debugging failing tests and getting a clear overview of your test suite's health.

### Code Coverage

Code coverage shows you what percentage of your code is covered by your tests. It's a useful metric for identifying untested parts of your application.

To generate a coverage report, run:

```bash
yarn coverage
```

This command will run your tests and create a `coverage/` directory in your project root. Inside this directory, you'll find a detailed HTML report. You can open it in your browser to explore the coverage of each file and see which lines of code are not tested.

```bash
open coverage/index.html
```

---

## Essential Chrome Extensions for React Development

As a frontend developer, your browser's developer tools are your best friend. There are also several extensions that significantly enhance the development experience, especially when working with React.

### 1. React Developer Tools

This is an absolute must-have for any React developer. It adds new tabs to your Chrome DevTools that allow you to:

- Inspect the React component hierarchy.
- View and edit the props and state of any React component.
- Track component updates and performance.
- Inspect hooks values.

- **Install from Chrome Web Store:** [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkafgcmiapbop)

### 2. React Query Devtools

Since we are using React Query for data fetching, its dedicated DevTools are incredibly useful. They allow you to:

- Visualize all your queries and mutations.
- Inspect cached data.
- Manually refetch, invalidate, or remove queries.
- Understand the lifecycle of your server state.

The React Query Devtools are already integrated into our example application (in `src/main.tsx`) and will appear as a small floating icon on the bottom-right of your screen when running the app in development mode.

---

## Conclusion & Next Steps

Congratulations! You've now seen the fundamental building blocks of a modern React application, from core hooks to the specific libraries we use in our projects.

### Key Takeaways

- **Component-based architecture** is key.
- **Hooks** (`useState`, `useEffect`, etc.) are how you add state and logic to functional components.
- For **server state**, prefer `react-query` over rolling your own `useEffect` solution.
- For **forms**, `react-hook-form` provides a performant and easy-to-use API.
- **Material-UI** provides a rich set of components to build UIs quickly.

### What to Explore Next

- **Performance Hooks:** `useMemo` and `useCallback` to prevent unnecessary re-renders.
- **Testing:** We use `vitest` and `react-testing-library`.
- **Advanced React Query:** Mutations (for POST/PUT/DELETE requests), query invalidation, and optimistic updates.
- **State Management:** For very complex global state, libraries like Zustand or Redux are common, but often `useContext` and `useReducer` (or React Query) are enough.

Feel free to explore the code in this workshop project and compare it to the concepts in our own codebase. Happy coding!
