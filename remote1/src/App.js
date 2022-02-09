import React, { useState } from 'react';
import Heading from "./Heading";
import Heading2 from 'remote2/Heading';

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <main>
      <h1>Remote 1's counter: {counter}</h1>
        <Heading />
        <Heading2 />
      <button onClick={() => setCounter(counter => counter + 1)}>increment</button>
    </main>
  );
};

export default App;
