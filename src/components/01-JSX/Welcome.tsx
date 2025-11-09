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
