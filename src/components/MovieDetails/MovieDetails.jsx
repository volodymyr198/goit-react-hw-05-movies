import { useNavigate, Link, useParams, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getlMovieDetails } from 'api/movies';
import noImage from '../../img/no-image.png';
import css from './MovieDetails.module.css';

export const MovieDetails = () => {
    const [state, setState] = useState({
        item: {},
        loading: false,
        error: null,
    });
    const { movieId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setState(prevState => {
                    return { ...prevState, loading: true, error: null };
                });
                const result = await getlMovieDetails(movieId);
                setState(prevState => {
                    return {
                        ...prevState,
                        item: result,
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
        fetchDetails();
    }, [movieId]);
    const { item, loading, error } = state;
    const {
        genres,
        overview,
        vote_average,
        original_title,
        release_date,
        poster_path,
    } = item;

    const getDateMovie = date => {
        const year = new Date(date);
        return year.getFullYear();
    };

    const getGenres = allGenres => {
        return allGenres.map(genre => genre.name).join(', ');
    };

    return (
        <main className={css.details}>
            {loading && <p>...load details</p>}
            {error && <p>...Details load filed</p>}
            {!loading && !error && genres && (
                <>
                    {/* <Link to="/">Go back</Link> */}
                    <button
                        onClick={() => navigate(-1)}
                        className={css.details__backBtn}
                    >
                        Go back
                    </button>
                    <div className={css.details__wrapper}>
                        {poster_path ? (
                            <img
                                className={css.details__img}
                                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                                alt={original_title}
                                width="300px"
                                height="450px"
                            />
                        ) : (
                            <img
                                className={css.details__img}
                                src={noImage}
                                alt="not available"
                                width="300px"
                                height="450px"
                            />
                        )}

                        <div>
                            <h1 className={css.details__title}>
                                {original_title} ({getDateMovie(release_date)})
                            </h1>
                            <p>
                                User Score:{' '}
                                {Math.round(vote_average * 10) ||
                                    'Sorry, nothing found!'}
                                %
                            </p>
                            <h3 className={css.details__pretitle}>Overview</h3>
                            <p>{overview || 'Sorry, nothing found!'} </p>
                            <h3 className={css.details__pretitle}>Genres</h3>
                            <p>
                                {getGenres(genres) || 'Sorry, nothing found!'}
                            </p>
                        </div>
                    </div>
                    <div className={css.additional}>
                        <h3 className={css.additional__title}>
                            Additional information
                        </h3>
                        <ul className={css.additional__list}>
                            <li>
                                <Link
                                    className={css.additional__item}
                                    to="cast"
                                >
                                    Cast
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={css.additional__item}
                                    to="reviews "
                                >
                                    Reviews
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <Outlet />
                </>
            )}
        </main>
    );
};
