import React from 'react';
import styled from 'styled-components';
import SliderTemplate from '../Components/SliderTemplate';
import { fetchPlayingMovies, fetchPopularMovies, fetchTopMovies, ITrendMoviesResult } from '../api';
import { useQuery } from 'react-query';


const Wrapper = styled.div`
    background-color: black;
        margin-top: 80px;
`

function Movie() {
    const { isLoading: isPlayingMoviesLoading, data: playingMoviesData } = useQuery<ITrendMoviesResult>(
        ["playingMovies", "currentPlayingMovies"], fetchPlayingMovies);

    const { isLoading: isPopularMoviesLoading, data: popularMoviesData } = useQuery<ITrendMoviesResult>(
        ["popularMovies", "currentPopularMovies"], fetchPopularMovies);

    const { isLoading: isTopMoviesLoading, data: topMoviesData } = useQuery<ITrendMoviesResult>(
        ["topMovies", "currentTopMovies"], fetchTopMovies
    );

    return (
        <Wrapper>
            <SliderTemplate isLoading={isPlayingMoviesLoading}
                data={playingMoviesData?.results.slice(0, 20)!}
                title="Movies that are currently in theatres"
                category="movie" />
            <SliderTemplate isLoading={isPopularMoviesLoading}
                data={popularMoviesData?.results.slice(0, 20)!}
                title="TV shows ordered by popularity"
                category="movie" />
            <SliderTemplate isLoading={isTopMoviesLoading}
                data={topMoviesData?.results.slice(0, 20)!}
                title="TV shows ordered by rating"
                category="movie" />
        </Wrapper>
    );
}
export default Movie;