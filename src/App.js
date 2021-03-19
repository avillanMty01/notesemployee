import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'

/* use axios to get json data */
/* sample url:   http://exastation01/javadomino/json-testing.nsf/$employeesjson/ID4000?OpenDocument  */


function App() {

  const [document, setDocument] = useState({})

  useEffect(() => {
    var docLink = ''
    axios
      .get('http://192.168.1.100/javadomino/json-testing.nsf/api/data/collections/name/employees?keys=ID4102')
      .then(res => {
        docLink = 'http://192.168.1.100' + res.data[0]['@link'].href
        /* we get the data for the VIEW ENTRY for the user ID*/
        console.log(docLink)
        axios
            .get(docLink)
            .then(res => {
              setDocument(res.data)
              console.log(document)
              /* and now we get the document JSON in res.data */
              /* now we can handle the data */
            })
      })

  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  return (

    <div className="App">
      <p>Employee name</p>
      <span>{document.FirstName} </span>
      <span>{document.LastName}</span>
    </div>
  );
}

export default App;
