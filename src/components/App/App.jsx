import { NavLink, Route, Routes } from 'react-router-dom';
import { GiFilmProjector } from 'react-icons/gi';
import { lazy, Suspense } from 'react';

import css from './App.module.css';
const Home = lazy(() => import('components/Home/Home'));
const Movies = lazy(() => import('components/Movies/Movies'));
const MovieDetails = lazy(() => import('components/MovieDetails/MovieDetails'));
const Cast = lazy(() => import('components/Cast/Cast'));
const Reviews = lazy(() => import('components/Reviews/Reviews'));
const NotFoundPage = lazy(() => import('components/NotFoundPage/NotFoundPage'));

export const App = () => {
    const getClassName = ({ isActive }) => {
        const className = isActive
            ? `${css.navLink} ${css.active}`
            : css.navLink;
        return className;
    };
    return (
        <>
            <header className={css.header}>
                <nav className={css.navigation}>
                    <GiFilmProjector className={css.svg} />
                    <NavLink className={getClassName} to="/">
                        Home
                    </NavLink>
                    <NavLink className={getClassName} to="/movies">
                        Movies
                    </NavLink>
                </nav>
            </header>
            <Suspense fallback={<p className={css.default}>...load movies</p>}>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/movies" element={<Movies />}></Route>
                    <Route path="/movies/:movieId" element={<MovieDetails />}>
                        <Route path="cast" element={<Cast />}></Route>
                        <Route path="reviews" element={<Reviews />}></Route>
                    </Route>

                    <Route path="*" element={<NotFoundPage />}></Route>
                </Routes>
            </Suspense>
        </>
    );
};
