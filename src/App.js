import React from 'react';
import Lounge from './Pages/Lounge';
import Kitchen from './Pages/Kitchen'
import Nav from './Components/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { StyleSheet, css } from 'aphrodite';
import Header from './Components/Header/Header';
import Delivery from './Pages/Delivery'


function App() {
  return (
    <Router>
      <Header />
      <Nav />
      <div className={css(styles.navPage)}>
        <Switch>
          <Route path="/Lounge" component={Lounge} />
          <Route path="/Kitchen" component={Kitchen} />
          <Route path="/Delivery" component={Delivery} />
        </Switch>
      </div>
    </Router>
  )
}

const styles = StyleSheet.create({

  navPage: {
    fontFamily: ['Montserrat', 'sans-serif'],
    src: "url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap')",
  },

})

export default App;
