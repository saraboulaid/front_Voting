import Test from "./Test.jsx";
import React, { useState, useEffect } from "react";

function App() {
  const [userid, setUserid] = useState(null);
  const [param, setParam] = useState(null);

  return (
    <>
      {param === null ? (
        <>
          <input
            type="text"
            value={userid}
            onChange={(event) => setUserid(event.target.value)}
          />
          <button onClick={() => setParam(1)}>Connect</button>
        </>
      ) : (
        <Test userid={userid} />
      )}
    </>
  );
}

export default App;
