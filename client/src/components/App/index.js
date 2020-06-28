import React from 'react';
import './style.css';
import SelectBox from '../Common/selectBox';

function App() {
  return (
    <div>
      <SelectBox placeholder="select an item" elements={['ali', 'dahdouh']} />
    </div>
  );
}

export default App;
