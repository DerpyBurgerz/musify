import logo from './logo.svg';
import './App.css';

const isButtonEnabled = true

function App() {
  return (
    <div className="main">
      <h1>musify.</h1>
      <p>Your tool to discover new music.</p>
      {isButtonEnabled && <MyButton />}
    </div>
  );
}

function MyButton() {
  const handleClick = () => {
    console.log("Button click!");
  };

  return (
    <button onClick = {handleClick}>Test button</button>
  ); 
}

export default App;

