import React from 'react';
import ReactDOM from 'react-dom';

import { MainView } from './components/main-view/main-view';
//import { MovieCard } from '../movie-card/movie-card';

import './index.scss';

class MyFlixApplication extends React.Component {
  render() {
    return <MainView />;
  }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container)