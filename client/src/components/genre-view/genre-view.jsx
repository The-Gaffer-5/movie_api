import React from 'react';
import './genre-view.scss';


export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }
  render() {
    const { movie } = this.props;
    console.log(movie)

    return (
      <div className="cards" id="cardID">
        <img src={movie.imageURL} alt="movie images" />
        <div className="text-area">
          <h1>{movie.Title}</h1>
          <h3>{movie.Genre.Name}</h3>
        </div>
      </div>
    );
  }
}