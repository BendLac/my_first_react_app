import React from "react";
import { useState, useEffect } from "react";
import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'https://www.omdbapi.com?apikey=63ded140'       //API for about 1 month usage

const App = () => {
    const [movies, setMovies] = useState([]);
    const [SearchTerm, setSearchTerm] = useState('');
    
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }
    
    useEffect(() => {
        searchMovies('Spiderman');
    }, []);     //az "effect" lefutásakor hívódik csak meg a [] miatt amikor betölt a lap

    return(
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={SearchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(SearchTerm)}
                />
            </div>

            {movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
            )}
        </div>
    );
}

export default App;