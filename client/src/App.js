import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function App() {
  const hostname = process.env.NODE_ENV === "production" ? "" : "http://localhost:3001";
  const url = hostname + "/api/pdf";
  console.log("url", url);

  return (
    <div className="App">
      Click button to open PDF file. <p/>
      <a href={url} target="_blank">
        <button>View PDF</button>
      </a>
    </div>
  );
}

export default App;
