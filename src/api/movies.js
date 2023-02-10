import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: 'c4470790ebbe8d3413f4b160c59323f6',
    },
});

export const getTrendingMovies = async () => {
    const requestParams = '/trending/movie/day';
    const { data } = await instance.get(requestParams);
    return data.results;
};

export const getMovieDetails = async id => {
    const requestParams = `/movie/${id}`;
    const { data } = await instance.get(requestParams);
    return data;
};

export const getSearchMovie = async searchQuery => {
    const requestParams = `/search/movie?query=${searchQuery}`;
    const { data } = await instance.get(requestParams);
    return data.results;
};

export const getMovieCast = async id => {
    const requestParams = `/movie/${id}/credits`;
    const { data } = await instance.get(requestParams);
    return data.cast;
};

export const getMovieReviews = async id => {
    const requestParams = `/movie/${id}/reviews`;
    const { data } = await instance.get(requestParams);
    return data.results;
};
