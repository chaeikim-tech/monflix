import React from 'react';
import { useQuery } from "react-query";
import { Link, useParams, useLocation } from "react-router-dom";
import styled from 'styled-components';
import { fetchDetail, IMovieDetail } from '../api';
import { makeImagePath } from "../utils";
import { IoMdArrowRoundBack } from "react-icons/io";


const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 900px) {
        margin-top: 50px;
        flex-direction: column-reverse;
    }
`

const HomeIcon = styled(IoMdArrowRoundBack)`
    font-size: 2.5rem;
    color: ${(props) => props.theme.white.darker};
    cursor:pointer;
    margin-top: 2rem;
    @media only screen and (max-width: 900px) {
        font-size: 1.5rem;
    }
`

const DetailMain = styled.div<{ image_url: string }>`
  width: 100%;
  display: flex;
  padding: 15% 5%;
  position: relative;
  z-index: 0;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.6),
        rgba(0, 0, 0, 1)
      ),
      url(${(props) => props.image_url});
    filter: blur(30px);
    background-color: gray;
    background-size: 100%;
    background-position: center;
    z-index: -1;
  }
  @media only screen and (max-width: 900px) {
    display: contents;
    flex-direction: row-reverse;
  }
`;

const PlayerInfo = styled.div`
    width: 60%;
    padding: 2% 5% 2% 1%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const InfoTitle = styled.div`
  color: ${(props) => props.theme.white.darker};
  font-weight: 600;
  font-size: 300%;
  margin-bottom: 1%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const InfoCaption = styled.div`
  font-size: 100%;
  color:yellow;
  padding: 1rem 0;
`;

const InfoOverview = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  color:${(props) => props.theme.white.darker};
`;
const DetailMainImg = styled.div<{ image_url: string }>`
  width: 30%;
  margin-right: 5%;
  background-color: gray;
  background-image: url(${(props) => props.image_url});
  background-size: cover;
  border-radius: 5px;
  position: relative;
  aspect-ratio: 1 / 1.5;
`;

function CardDetail() {
  const location = useLocation();
  const { isLoading: isDetailLoading, data: detailData } = useQuery<IMovieDetail>(["detailData", "mediaId"], () => fetchDetail(location.pathname));
  console.log(detailData, location);
  return (
    <Wrapper>
      {isDetailLoading ? (
        "Loading"
      ) : (
        <DetailMain
          image_url={makeImagePath(detailData?.backdrop_path || "", "original")}
        >
          <PlayerInfo>
            <InfoTitle>{detailData?.title || detailData?.name}</InfoTitle>
            <InfoCaption>{detailData?.tagline}</InfoCaption>
            <InfoOverview>{detailData?.overview}</InfoOverview>
            <Link to="/">
              <HomeIcon />
            </Link>
          </PlayerInfo>
          <DetailMainImg
            image_url={makeImagePath(detailData?.poster_path || "", "w500")}
          />
        </DetailMain>
      )}
    </Wrapper>
  );
}

export default CardDetail;