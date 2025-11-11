import type { ReactNode } from 'react';

interface GreetingProps {
  name: string;
  children?: ReactNode;
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
