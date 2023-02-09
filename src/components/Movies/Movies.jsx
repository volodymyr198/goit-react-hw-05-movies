import { Link, useSearchParams } from 'react-router-dom';

import { getSearchMovie } from 'api/movies';
import { useState, useEffect } from 'react';

import css from './Movies.module.css';

export const Movies = () => {
    const [state, setState] = useState({
        items: [],
        loading: false,
        error: null,
    });

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query');

    const [search, setSearch] = useState(() => query || '');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setState(prevState => {
                    return { ...prevState, loading: true };
                });

                const results = await getSearchMovie(query);
                setState(prevState => ({
                    ...prevState,
                    items: results,
                }));
            } catch (error) {
                setState(prevState => ({
                    ...prevState,
                    error,
                }));
            } finally {
                setState(prevState => ({
                    ...prevState,
                    loading: false,
                }));
            }
        };
        if (query) {
            fetchMovies();
        }
    }, [query]);

    const { items, loading, error } = state;

    const elements = items.map(({ id, original_title }) => (
        <li key={id}>
            <Link to={`/movies/${id}`}>{original_title}</Link>
        </li>
    ));

    const handleChange = ({ target }) => {
        setSearch(target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (search.trim()) {
            setSearchParams({ query: search });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className={css.searchForm}>
                <label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="search"
                        value={search}
                        placeholder="Search Movies"
                        required
                    />
                    <button type="sabmit">Search</button>
                </label>
            </form>
            {search && items.length > 0 && !loading && !error && (
                <ul>{elements}</ul>
            )}
            {loading && <p>...load movies</p>}
            {error && <p>...Movies load filed</p>}
        </div>
    );
};
