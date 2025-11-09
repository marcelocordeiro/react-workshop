# React Workshop
## Introduction

Welcome! This workshop is designed for experienced backend engineers who are new to frontend development, specifically React. Our goal is to quickly get you up to speed with the core concepts of React and familiarize you with the patterns and libraries we use in our own projects.

### What is React?

- **A JavaScript library for building user interfaces.** It's not a full-blown framework like Angular. It focuses on the "view" layer of your application.
- **Component-Based:** You build encapsulated components that manage their own state, then compose them to make complex UIs. This makes code reusable and easier to reason about.
- **Declarative:** You describe *what* you want the UI to look like for a given state, and React takes care of updating the actual DOM efficiently. You don't manually manipulate the DOM (e.g., `document.getElementById(...)`).
- **"Learn Once, Write Anywhere":** The same concepts apply to web (with React DOM) and mobile (with React Native).

### Our Tech Stack

- **Build Tool:** Vite (a super-fast modern alternative to Create React App/Webpack)
- **Language:** TypeScript
- **Package Manager:** Yarn
- **UI Library:** Material-UI (MUI)
- **Data Fetching:** React Query + Axios
- **Forms:** React Hook Form
- **Routing:** React Router

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
2.  **New VDOM:** React creates a brand new Virtual DOM tree that represents what the UI *should* look like after the change.
3.  **Diffing:** React then compares ("diffs") this new VDOM tree with the previous VDOM tree it has in memory.
4.  **Calculate Changes:** It figures out the most efficient, minimal set of changes needed to make the real DOM match the new VDOM.
5.  **Batch Update:** React takes these calculated changes and updates the real DOM in a single, optimized batch.

This process is far more performant because React minimizes the expensive direct interactions with the browser's DOM.

### The React Component Lifecycle (with Hooks)

A component has a "lifecycle" – it gets created (mounted), it can be updated with new data, and it eventually gets destroyed (unmounted). In modern React, we manage this lifecycle using hooks within our functional components.

1.  **Mounting Phase (Birth):**
    - **What it is:** The component is being created and inserted into the DOM for the first time.
    - **How it works:** React calls your component function for the first time to get its JSX. It then creates the real DOM nodes and adds them to the page.
    - **The Hook:** `useEffect(() => { ... }, [])` (with an empty dependency array) runs *after* the component has mounted. This is the perfect place for one-time setup, like fetching initial data from an API.

2.  **Updating Phase (Life):**
    - **What it is:** The component is re-rendering because its state or props have changed.
    - **How it works:** The state or props of your component are updated. React calls your component function again to get the new JSX. It then runs the "diffing" algorithm described above to efficiently update the real DOM.
    - **The Hook:** `useEffect(() => { ... }, [dependency1, dependency2])` runs *after* a render, but *only if* one of its dependencies has changed. This is useful for reacting to specific prop or state changes.

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

function Welcome() {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>The time is: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}

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

function Greeting({ name, children }: GreetingProps) {
  return (
    <div style={{ border: '1px solid gray', padding: '1rem', margin: '1rem 0' }}>
      <h2>Hello, {name}!</h2>
      {children}
    </div>
  );
}

export default Greeting;
```

**Usage in `App.tsx`:**
```tsx
import Greeting from './components/02-Props/Greeting';

// ... inside App component
<Greeting name="Ana">
  <p>This is a message passed as a child.</p>
</Greeting>
<Greeting name="Marcelo">
  <button>Click me!</button>
</Greeting>
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
import { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Button variant="contained" onClick={() => setCount((prevCount) => prevCount + 1)}>
        +
      </Button>
      <Typography>Count is {count}</Typography>
      <Button variant="contained" onClick={() => setCount((prevCount) => prevCount - 1)}>
        -
      </Button>
    </Box>
  );
}

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
  Typography,
  Alert,
} from '@mui/material';

interface User {
  id: number;
  name: string;
  email: string;
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch users.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this effect runs once on mount.

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
}

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

`useContext` lets you "subscribe" to a "context", allowing you to read a value from a provider higher up in the tree without passing it down explicitly.

The pattern is:
1.  **Create a Context:** Use `createContext` to create a context object.
2.  **Provide the Context:** Use the `<MyContext.Provider value={...}>` component to wrap a part of your component tree. Any component inside this provider can now access the value.
3.  **Consume the Context:** Use the `useContext(MyContext)` hook in a child component to read the value.

**Example: A Theme Switcher**

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
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import type { PaletteMode } from '@mui/material';
import { ThemeContext } from './theme-context'; // Import from the new file

interface ThemeProviderProps {
  children: ReactNode;
}

// 2. Create the provider component
export function ThemeProvider({ children }: ThemeProviderProps) {
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
}
```

**`src/components/05-useContext/ThemeSwitcher.tsx`**
```tsx
import { useContext } from 'react';
import { IconButton, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { ThemeContext } from './theme-context'; // Import from the new file

function ThemeSwitcher() {
  // 3. Consume the context
  const { mode, toggleTheme } = useContext(ThemeContext);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      Current Mode: {mode}
      <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Box>
  );
}

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
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'REMOVE_TODO':
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

function Todo() {
  // Initialize useReducer with the reducer function and initial state.
  const [todos, dispatch] = useReducer(reducer, []);
  const [text, setText] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      // Dispatch an action to the reducer.
      dispatch({ type: 'ADD_TODO', payload: text });
      setText('');
    }
  };

  return (
    <Box>
      <Typography variant="h6">My Todo List</Typography>
      <Box component="form" onSubmit={handleAddTodo} sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          label="New Todo"
          variant="outlined"
          size="small"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained">
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
                onClick={() => dispatch({ type: 'REMOVE_TODO', payload: todo.id })}
              >
                <Delete />
              </IconButton>
            }
          >
            <Checkbox
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
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
}

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
// ... other page imports

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="jsx" element={<JsxPage />} />
        // ... other routes
      </Route>
    </Routes>
  );
}
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
import { useQuery } from 'react-query';
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

// The fetcher function can be any function that returns a promise
const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
  return data;
};

function UserListWithReactQuery() {
  // Use the useQuery hook
  const { data, error, isLoading, isError } = useQuery<User[], Error>(
    'users', // The unique key for this query
    fetchUsers // The function to fetch the data
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">Error: {error.message}</Alert>;
  }

  return (
    <List>
      {data?.map((user) => (
        <ListItem key={user.id}>
          <ListItemText primary={user.name} secondary={user.email} />
        </ListItem>
      ))}
    </List>
  );
}

export default UserListWithReactQuery;
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
import { TextField, Button, Box, Typography, Checkbox, FormControlLabel } from '@mui/material';

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  subscribe: boolean;
}

function SimpleForm() {
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
}

export default SimpleForm;
```

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
