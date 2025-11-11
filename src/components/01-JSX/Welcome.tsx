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
