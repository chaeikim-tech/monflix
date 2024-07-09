import React from 'react';
import styled from 'styled-components';
import SliderTemplate from '../Components/SliderTemplate';
import { fetchTopTV, fetchPopularTv, fetchAirTv, ITrendMoviesResult } from '../api';
import { useQuery } from 'react-query';


const Wrapper = styled.div`
    background: black;
    margin-top: 80px;
`

function Tv() {
  const { isLoading: isTopTvLoading, data: topTvData } = useQuery<ITrendMoviesResult>(
    ["topTv", "currentTopTv"], fetchTopTV);

  const { isLoading: isPopularTvLoading, data: popularTvData } = useQuery<ITrendMoviesResult>(
    ["popularTv", "currentPopularTv"], fetchPopularTv);

  const { isLoading: isAirTvLoading, data: airTvData } = useQuery<ITrendMoviesResult>(
    ["airTv", "currentAirTv"], fetchAirTv
  );



  return (
    <Wrapper>
      <SliderTemplate isLoading={isTopTvLoading}
        data={topTvData?.results.slice(0, 20)!}
        title="TV shows ordered by rating"
        category="tv"
      />
      <SliderTemplate isLoading={isPopularTvLoading}
        data={popularTvData?.results.slice(0, 20)!}
        title="list of TV shows ordered by popularity"
        category="tv" />
      <SliderTemplate isLoading={isAirTvLoading}
        data={airTvData?.results.slice(0, 20)!}
        title="TV shows that air in the next 7 days"
        category="tv" />
    </Wrapper>
  );
}
export default Tv;