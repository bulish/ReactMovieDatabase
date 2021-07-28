import React, { useEffect, useState } from 'react';
import './styles.scss';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function App() {
	const [info, setInfo] = useState(null);
	const [input, setInput] = useState('');
	useEffect(() => {
		const apiData = axios
			.get('https://www.omdbapi.com/?apikey=22cc215b&t=titanic')
			.then(data => {
        setInfo(data.data);
        console.log(data.data);
			});
	}, []);

  const inputMovie = (e) => {
    setInput(e.target.value);
  }

  const searchMovie = () => {
    axios
			.get(`https://www.omdbapi.com/?apikey=22cc215b&t=${input}`)
			.then(data => {
				setInfo(data.data);
			});
  };

	return (
		<div>
      <div className="title">Movie Database</div>
      <div className="search">
        <input type="text" onChange={inputMovie}/>
        <FontAwesomeIcon icon={faSearch} className="icon" onClick={searchMovie}/>
      </div>
			{info && (
				<div className="info">
          <div className="info__img">
            <img src={info.Poster} alt="" />
          </div>
          <div className="info__container">
            <div className="info__container__rating">{info.Ratings!== undefined ? info.Ratings[0].Value : ''}</div>
            <h1 className="info__container__title">{info.Title}</h1>
            <div className="info__container__genre">{info.Genre}</div>
            <div className="info__container__country">{info.Country}</div>
            <div className="info__container__year">Year: {info.Year}</div>
            <div className="info__container__director">Director: {info.Director}</div>
            <div className="info__container__writer">Writer: {info.Writer}</div>
            <div className="info__container__actors">Actors: {info.Actors}</div>
            <div className="info__container__plot">Plot: {info.Plot}</div>
          </div>
				</div>
			)}
		</div>
	);
}

export default App;
