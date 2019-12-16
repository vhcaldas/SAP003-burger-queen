import React, { useState, useEffect} from 'react';
import firebase from '../src/Utils/firebaseUtil';

function App() {
  useEffect(() => {
    firebase.collection('menu').get()
      .then((docs) => {
        docs.map(doc => {
          console.log(doc.data())
        });
      });
  }, []);
}

export default App;
