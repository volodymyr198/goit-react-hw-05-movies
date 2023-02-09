import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getTrendingMovies } from 'api/movies';
import css from './Home.module.css';

export const Home = () => {
    const [state, setState] = useState({
        items: [],
        loading: false,
        error: null,
    });

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
                // console.log(error.message);
                setState(prevState => {
                    return { ...prevState, error };
                });
            } finally {
                setState(prevState => {
                    // console.log(prevState.items);
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
        <li key={id}>
            <Link to={`/movies/${id}`}>{original_title}</Link>
        </li>
    ));

    return (
        <div className={css.trending}>
            <h1 className={css.trending__title}>Trending to day</h1>
            {items.length > 0 && <ul>{elements}</ul>}
            {loading && <p>...load movies</p>}
            {error && <p>...Movies load filed</p>}
        </div>
    );
};
