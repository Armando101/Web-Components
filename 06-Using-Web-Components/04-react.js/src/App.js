import React, { useState } from "react";

export const App = () => {
  const [state, setState] = useState({ showStockFinder: false });

  const { showStockFinder } = state;
  return (
    <div className="App">
      <app-stock-price />

      {showStockFinder && <app-stock-finder />}
      <button onClick={() => setState({ showStockFinder: true })}>
        Show finder
      </button>
    </div>
  );
};

export default App;
