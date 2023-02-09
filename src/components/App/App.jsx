import { NavLink, Route, Routes } from 'react-router-dom';

import { Home } from 'components/Home/Home';
import { Movies } from 'components/Movies/Movies';
import { MovieDetails } from 'components/MovieDetails/MovieDetails';
import { Cast } from 'components/Cast/Cast';
import { Reviews } from 'components/Reviews/Reviews';
import { NotFoundPage } from 'components/NotFoundPage/NotFoundPage';
import css from './App.module.css';

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
                    <NavLink className={getClassName} to="/">
                        Home
                    </NavLink>
                    <NavLink className={getClassName} to="/movies">
                        Movies
                    </NavLink>
                </nav>
            </header>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/movies" element={<Movies />}></Route>
                <Route path="/movies/:movieId" element={<MovieDetails />}>
                    <Route path="cast" element={<Cast />}></Route>
                    <Route path="reviews" element={<Reviews />}></Route>
                </Route>

                <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
        </>
    );
};
