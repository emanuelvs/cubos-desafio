import React from 'react';
import Header from './components/header';
import MovieList from './screens/movie-list';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MovieDetail from './screens/movie-detail';

function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/" component={MovieList}/>
        <Route path="/:movieId" component={MovieDetail}/>
      </Switch>
    </Router>
  );
}

export default App;
