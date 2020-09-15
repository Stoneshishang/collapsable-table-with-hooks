import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [detailsShown, setdetailsShown] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const result = await fetch("https://jsonplaceholder.typicode.com/users");
    const getResults = await result.json();
    setData(getResults);
    // console.log(getResults);
  }

  const toggleShown = (username) => {
    console.log("----------------click--------------");
    console.log("username is: ", username);
    // slice method to return selected elements as new array object.
    const shownState = detailsShown.slice();
    //indexOf to search array for specied item
    const index = shownState.indexOf(username);
    console.log("user name index is: ", index);
    //if item found remove item
    if (index >= 0) {
      //splice / adds / removes item
      // 1 means remove one item
      // remove one item if found
      shownState.splice(index, 1);
      setdetailsShown(shownState);
    } else {
      shownState.push(username);
      setdetailsShown(shownState);
    }
  };

  function renderDate() {
    return (
      <table>
        <tbody>
          {data.map((user) => (
            <React.Fragment key={user.id}>
              <tr>
                <td>{user.name}</td>
                <td>
                  <button onClick={() => toggleShown(user.name)}>
                    Toggle Details
                  </button>
                </td>
              </tr>

              {detailsShown.includes(user.name) && (
                <tr className='additional-info'>
                  <td colSpan='2'>{user.company.catchPhrase}</td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className='App'>
      <h2>Collapsable Adjacent Rows</h2>
      <hr />
      {renderDate()}
    </div>
  );
}

export default App;
