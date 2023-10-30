import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/home.css";

const URL = "https://650bb0bedfd73d1fab0a2541.mockapi.io/fil/film";

const Home = () => {
  const [films, setFilms] = useState([]);

  const getListFilm = useCallback(async () => {
    try {
      const res = await axios.get(`${URL}`);
      if (res.status === 200) {
        setFilms(res.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    getListFilm();
  }, [getListFilm]);

  return (
    <div className="container">
      {films &&
        films.map((film) => (
          <div className="card" key={film.id}>
            <div className="card-image">
              <img src={film.imgage} alt={film.id} />
            </div>
            <h3 className="card-title">{film.title}</h3>
            <p className="card-year">Year: {film.year}</p>
            <p className="card-nation">Nation: {film.nation} star</p>
            <Link to={`/details/${film.id}`}>
              <button className="details-button">Details</button>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Home;
