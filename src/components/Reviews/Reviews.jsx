import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getMovieReviews } from 'api/movies';
import css from './Reviews.module.css';

export const Reviews = () => {
    const [state, setState] = useState({
        items: [],
        loading: false,
        error: null,
    });
    const { movieId } = useParams();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setState(prevState => {
                    return { ...prevState, loading: true, error: null };
                });
                const result = await getMovieReviews(movieId);

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
        fetchReviews();
    }, [movieId]);
    const { items, loading, error } = state;

    const elements = items.map(({ author, content, id }) => (
        <li key={id}>
            <h3 className={css.reviews__title}>Author: {author}</h3>
            <p>{content}</p>
        </li>
    ));

    return (
        <div className={css.reviews}>
            {items.length === 0 && !loading && !error && (
                <p className={css.default}>Sorry, nothing found!</p>
            )}
            {loading && <p className={css.default}>...load Reviews</p>}
            {error && <p className={css.default}>...Cast load filed</p>}
            {!loading && !error && items && <ul>{elements}</ul>}
        </div>
    );
};

export default Reviews;
