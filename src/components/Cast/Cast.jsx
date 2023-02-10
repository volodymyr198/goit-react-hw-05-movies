import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import noUserImage from '../../img/no-user-image.gif';
import { getMovieCast } from 'api/movies';
import css from './Cast.module.css';

const Cast = () => {
    const [state, setState] = useState({
        items: [],
        loading: false,
        error: null,
    });
    const { movieId } = useParams();

    useEffect(() => {
        const fetchCast = async () => {
            try {
                setState(prevState => {
                    return { ...prevState, loading: true, error: null };
                });
                const result = await getMovieCast(movieId);
                setState(prevState => {
                    return {
                        ...prevState,
                        items: result,
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
        fetchCast();
    }, [movieId]);
    const { items, loading, error } = state;

    const elements = items.map(({ profile_path, name, character, cast_id }) => (
        <li key={cast_id} className={css.cast__item}>
            {profile_path ? (
                <img
                    src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                    alt={name}
                    width="160px"
                    height="230px"
                />
            ) : (
                <img
                    src={noUserImage}
                    alt={name}
                    width="160px"
                    height="230px"
                />
            )}
            <h3>{name}</h3>
            <p>Character: {character}</p>
        </li>
    ));

    return (
        <div>
            {items.length === 0 && !loading && !error && (
                <p className={css.default}>Sorry, nothing found!</p>
            )}
            {loading && <p className={css.default}>...load Cast</p>}
            {error && <p className={css.default}>...Cast load filed</p>}
            {!loading && !error && items && (
                <ul className={css.cast__list}>{elements}</ul>
            )}
        </div>
    );
};

export default Cast;
