const Welcome = () => {
  const name = 'Backend Engineer';
  return (
    <>
      <h1>Hello, {name}!</h1>
      <p>The time is: {new Date().toLocaleTimeString()}</p>
    </>
  );
};

export default Welcome;
