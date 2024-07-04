import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from "react-query";
import { IData, ITrendMoviesResult, fetchSeacrh } from "../api";
import { useParams } from "react-router-dom";
import Card from "../Components/Card";
import { useEffect } from "react";

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  background-color: rgb(5, 5, 5);
  min-height: 90vh;
`;

const Contents = styled.div`
  padding: 10% 5%;
  background-color: rgb(5, 5, 5);
`;
const Title = styled.span`
  color: ${(props) => props.theme.gray100};
  font-size: 130%;
  font-weight: 600;
`;
const Cards = styled.div`
  margin-top: 2%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 2%;
  & > div {
    margin-bottom: 2%;
  }
`;


interface ISearch {
  overview: string;
  popularity: number;
  backdrop_path: string;
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  title?: string;
  name?: string;
  vote_average: number;
  adult?: boolean;
  media_type?: "movie" | "tv";
}

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);

  let { isLoading, data, refetch } = useQuery<ITrendMoviesResult>("searchData", () =>
    fetchSeacrh(keyword || "")
  );

  useEffect(() => {
    refetch();
  }, [keyword, refetch]);

  return (
    <Wrapper>
      <Contents>
        {isLoading ? (
          "Loading..."
        ) : data?.results.length === 0 ? (
          <Title>{keyword}의 검색결과가 없습니다</Title>
        ) : (
          <>
            <Title>{keyword}의 검색결과</Title>
            <Cards>
              {data?.results?.map((data) => (
                <Card key={data.id} data={data} />
              ))}
            </Cards>
          </>
        )}
      </Contents>
    </Wrapper>
  );


}
export default Search;