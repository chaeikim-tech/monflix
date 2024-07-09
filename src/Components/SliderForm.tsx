import { useQuery } from 'react-query';
import { fetchTrendingMovie, ITrendMoviesResult, IGetMoviesResult } from '../api';
import { makeImagePath } from '../utils';
import { styled } from 'styled-components';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate, useMatch, PathMatch } from 'react-router-dom';
import { IData } from "../api";

const Wrapper = styled.div`
  width: 100%;
  background-color: black;
  position: relative;
  color: ${(props) => props.theme.gray.lighter};
  padding: 0% 5%;
  aspect-ratio: 100 / 32;
`;

const Title = styled.h2`
  font-weight: 600;
  padding: 1% 0%;
  color: ${(props) => props.theme.gray.lighter};
  display: flex;
`;


const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const Slider = styled(motion.div)`
  position: absolute;
  top: 11%;
  width: 90%;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  font-size: 100%;
  overflow: hidden;
  gap: 1%;
  transition: all 0.2s ease-in-out;
`;

const Box = styled(motion.div) <{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  width: 100%;
  aspect-ratio: 1 / 1.415;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:first-child{
    transform-origin: center left;
  }
  &:last-child{
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 12px;
  }
`

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  height: 350px;
  aspect-ratio: 1 / 1.415;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 40px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;


const rowVariants = {
    hidden: {
        x: window.outerWidth + 5,
    },
    visible: {
        x: 0,
    },
    exit: {
        x: -window.outerWidth - 5,
    },
};

const boxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        y: -30,
        transition: {
            delay: 0.5,
            duration: 0.1,
            type: "tween",
        },
    },
};

const offset = 6;


const infoVariants = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 0.1,
            type: "tween",
        }
    }
}

function SliderForm() {

    const navigate = useNavigate();
    const { scrollY } = useScroll();
    const bigMovieMatch: PathMatch<string> | null = useMatch("/trending/movies/:movieId");
    const { data: trendMovieData, isLoading: isMovieLoading } = useQuery<ITrendMoviesResult>(["movies", "nowPlaying"], fetchTrendingMovie);

    console.log(trendMovieData, isMovieLoading);
    console.log(bigMovieMatch);
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);

    const increaseIndex = () => {
        if (trendMovieData) {
            if (leaving) return;
            toggleLeaving();
            const totalMovies = trendMovieData.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex((prev) => (prev === maxIndex ? 0 : prev + 1))

        }
    };



    const toggleLeaving = () => setLeaving((prev) => !prev);

    const onBoxClicked = (movieId: number) => {
        navigate(`/movies/${movieId}`)
    }

    const onOverlayClick = () => navigate("/");
    const clickedMovie = bigMovieMatch?.params.movieId && trendMovieData?.results.find((movie) => movie.id + "" === bigMovieMatch.params.movieId);


    return (
        <>
            {isMovieLoading ? (<Loader>Loading...</Loader>) : (
                <Wrapper>
                    <Title>Title</Title>
                    <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                        <Slider>
                            <Row
                                variants={rowVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ type: "tween", duration: 1 }}
                                key={index}
                            >
                                {trendMovieData?.results
                                    .slice(1)
                                    .slice(offset * index, offset * index + offset)
                                    .map((movie) => (
                                        <Box
                                            layoutId={movie.id + ""}
                                            key={movie.id}
                                            whileHover="hover"
                                            initial="normal"
                                            variants={boxVariants}
                                            onClick={() => onBoxClicked(movie.id)}
                                            transition={{ type: "tween" }}
                                            bgphoto={makeImagePath(movie.poster_path, "w500")}
                                        >
                                            <Info variants={infoVariants}>
                                                <h4>{movie.title}</h4>
                                            </Info>

                                        </Box>
                                    ))}
                            </Row>
                        </Slider>
                    </AnimatePresence>
                    {/* <AnimatePresence>
                        {bigMovieMatch ? (
                            <>
                                <Overlay
                                    onClick={onOverlayClick}
                                    exit={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                />
                                <BigMovie
                                    style={{ top: scrollY.get() + 100 }}
                                    layoutId={bigMovieMatch.params.movieId}
                                >
                                    {clickedMovie && (
                                        <>
                                            <BigCover
                                                style={{
                                                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                                                        clickedMovie.backdrop_path,
                                                        "w500"
                                                    )})`,
                                                }}

                                            />
                                            <BigTitle>{clickedMovie.title}</BigTitle>
                                            <BigOverview>{clickedMovie.overview}</BigOverview>
                                        </>
                                    )}
                                </BigMovie>
                            </>
                        ) : null}
                    </AnimatePresence> */}
                </Wrapper>
            )}
        </>
    )
}

export default SliderForm