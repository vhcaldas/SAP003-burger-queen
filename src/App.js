import React, { useState, useEffect } from 'react';
import {db} from './Utils/firebaseUtil';

function App() {

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    db.collection('Menu').get()
    .then(querySnapshot => {
      const productsResult = [];
      querySnapshot.forEach((doc) => {
      productsResult.push(doc.data())
    });
      setMenu(productsResult);
  })}, []);

  console.log(menu);
  console.log(setMenu); 

  return (
    <div>Vivian</div>
    

  )

}

export default App;
