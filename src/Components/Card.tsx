import { styled } from "styled-components";
import { IData } from "../api";
import { makeImagePath } from "../utils";
import { Link } from "react-router-dom";
import React from 'react';

const Container = styled.div`
  width: 100%;
  font-size: 100%;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: translateY(-3%);
  }
`;
const CardPoster = styled.div<{ image_url: string }>`
  border-radius: 4px;
  width: 100%;
  background-image: url(${(props) => props.image_url});
  background-size: cover;
  aspect-ratio: 1 / 1.415;
`;
const CardTitle = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 2vw;
  font-weight: 600;
  padding: 2% 0%;
  color: #${(props) => props.theme.white.lighter};
`;

function Card({ data, category }: { data: IData; category?: "movie" | "tv" }) {
  const title = data.name || data.title;
  const linkTo = category || data.media_type;
  return (
    <Container>
      <CardPoster
        image_url={makeImagePath(data.poster_path, "w500")}
      ></CardPoster>
      <CardTitle>{title}</CardTitle>
    </Container>
  );
}

export default Card;