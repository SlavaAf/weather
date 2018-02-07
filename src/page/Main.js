import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './page.css';

import Home from '../home/Home';
import Today from '../today/Today';

const Main = () => {
  return(
    <main className={styles.main}>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/today' component={Today}/>
        {/* <Route exact path='/' render={(props) => (
          <Home {...props} data={"123"} />
        )}/> */}
      </Switch>
    </main>
  )
}

export default Main;
