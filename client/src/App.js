import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/steaminfo").then(
      res => res.json()
    ).then(
      data => {
        setData(data);
        console.log(data);
      }
    )
  }, [])

  return(
    <div>
      {data.steaminfo.map((info, i) => (
          <p key={i}>{info}</p>
        ))
      }
    </div>
  )
}

export default App;
