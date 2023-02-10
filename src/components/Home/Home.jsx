import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FcFilmReel } from 'react-icons/fc';

import { getTrendingMovies } from 'api/movies';
import css from './Home.module.css';

const Home = () => {
    const [state, setState] = useState({
        items: [],
        loading: false,
        error: null,
    });
    const location = useLocation();

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                setState(prevState => {
                    return { ...prevState, loading: true, error: null };
                });
                const results = await getTrendingMovies();
                setState(prevState => {
                    return {
                        ...prevState,
                        items: [...results],
                    };
                });
            } catch (error) {
                setState(prevState => {
                    return { ...prevState, error };
                });
            } finally {
                setState(prevState => {
                    return {
                        ...prevState,
                        loading: false,
                    };
                });
            }
        };
        fetchTrendingMovies();
    }, [setState]);

    const { items, loading, error } = state;

    const elements = items.map(({ id, original_title }) => (
        <li key={id} className={css.trending__item}>
            <FcFilmReel className={css.svg} />
            <Link state={{ from: location }} to={`/movies/${id}`}>
                {original_title}
            </Link>
        </li>
    ));

    return (
        <div className={css.trending}>
            <h1 className={css.trending__title}>Trending Movies to day:</h1>
            {items.length > 0 && <ul>{elements}</ul>}
            {loading && <p className={css.default}>...load movies</p>}
            {error && <p className={css.default}>...Movies load filed</p>}
        </div>
    );
};

export default Home;
