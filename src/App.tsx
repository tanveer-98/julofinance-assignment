import React, { Suspense, useEffect, useState } from "react";
import logo from "./logo.svg";
import { css } from "@emotion/css";
import { MovieProvider } from "./context/MovieContext";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import MyMovies from "./components/MyMovies/MyMovies";
const LazyMyMovies = React.lazy(
  () => import("./components/MyMovies/MyMovies")
);
// import './App.css';

const loadingStyle = css`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id" element={<MovieDetails />} />
      {/* <Route path="/favmovies" element={<MyMovies />} /> */}
      <Route
        path="/favmovies"
        element={
          <Suspense
            fallback={
              <div className="w-screen h-screen">
                <div className={loadingStyle}>Loading ...</div>
              </div>
            }
          >
            <LazyMyMovies />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
