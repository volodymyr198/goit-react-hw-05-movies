import { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { ImSearch } from 'react-icons/im';
import { FcFilmReel } from 'react-icons/fc';

import { getSearchMovie } from 'api/movies';
import css from './Movies.module.css';

const Movies = () => {
    const [state, setState] = useState({
        items: [],
        loading: false,
        error: null,
    });

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query');

    const [search, setSearch] = useState(() => query || '');
    const location = useLocation();

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

    const handleChange = ({ target }) => {
        setSearch(target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (search.trim()) {
            setSearchParams({ query: search });
        }
    };

    const elements = items.map(({ id, original_title }) => (
        <li key={id} className={css.search__item}>
            <FcFilmReel className={css.svg} />
            <Link state={{ from: location }} to={`/movies/${id}`}>
                {original_title}
            </Link>
        </li>
    ));
    return (
        <div className={css.wrapper}>
            <form
                onSubmit={handleSubmit}
                className={css.searchForm}
                autoComplete="off"
            >
                <input
                    className={css.searchForm__input}
                    onChange={handleChange}
                    type="text"
                    name="search"
                    value={search}
                    placeholder="Search Movies"
                    required
                />
                <button className={css.searchForm__btn} type="sabmit">
                    <ImSearch />
                </button>
            </form>
            {search && items.length > 0 && !loading && !error && (
                <ul>{elements}</ul>
            )}
            {loading && <p className={css.default}>...load movies</p>}
            {error && <p className={css.default}>...Movies load filed</p>}
            {items.length === 0 && query && !loading && !error && (
                <p className={css.default}>
                    {`Sorry, there is nothing with the title - ${query}!`}
                </p>
            )}
        </div>
    );
};

export default Movies;
