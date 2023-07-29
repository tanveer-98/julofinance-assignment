import React, { Suspense } from "react";

import { css } from "@emotion/css";

import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";

import Loading from "./components/Loading/Loading";

const LazyMyMovies = React.lazy(() => import("./components/MyMovies/MyMovies"));

const LazyMovieDetails = React.lazy(
  () => import("./components/MovieDetails/MovieDetails")
);

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
      {/* <Route path="/details/:id" element={<MovieDetails />} /> */}
      {/* <Route path="/favmovies" element={<MyMovies />} /> */}

      <Route
        path="/details/:id"
        element={
          <Suspense
            fallback={
              <div className="w-screen h-screen">
                <div className={loadingStyle}>
                  <Loading />
                </div>
              </div>
            }
          >
            <LazyMovieDetails />
          </Suspense>
        }
      />
      <Route
        path="/favmovies"
        element={
          <Suspense
            fallback={
              <div className="w-screen h-screen">
                <div className={loadingStyle}>
                  <Loading />
                </div>
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
