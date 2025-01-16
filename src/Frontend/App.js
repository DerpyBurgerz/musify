import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/message')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => setMessage(error.message));
  }, []);

  return (
    <div className="App">
      <h1>musify.</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;