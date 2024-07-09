import { useQuery } from 'react-query';
import { fetchTrendingAll, IGetMoviesResult, ITrendMoviesResult, fetchTrendingTv, fetchTrendingMovie } from '../api';
import { makeImagePath } from '../utils';
import { styled } from 'styled-components';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, useMatch, PathMatch } from 'react-router-dom';
import SliderTemplate from '../Components/SliderTemplate';
import { ImCancelCircle } from "react-icons/im";


const Wrapper = styled.div`
  background: black;
`;


const Banner = styled.div<{ bgphoto: string }>`
  height: 58vw;
  display: flex;
  flex-direction:column;
  justify-content:center;
  padding: 5vw;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;

`;

const Title = styled.h2`
  font-size: 3vw;
  margin-bottom: 2vw;
`;

const Overview = styled.p`
  font-size: 2vw;
  width: 60%;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  height: 3.6em;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3 ;
  -webkit-box-orient: vertical;
`;

const Slider = styled.div`
  position: relative;
  top: -22vw;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  height:100%;
`;

const Box = styled(motion.div) <{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  width: 100%;
  font-size: 100%;
  aspect-ratio: 1 / 1.415;
  cursor: pointer;
  &:first-child{
    transform-origin: center left;
  }
  &:last-child{
    transform-origin: center right;
  }
  
`;

const Info = styled(motion.div)`
  padding: 8px;
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
  z-index:99;
  position: absolute;
  width: 40vw;
  height: 50vw;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;


const BigCover = styled.div`
  width: 100%;
  height: 30vw;
  background-size: cover;
  background-position: center center;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 3vw;
  position: relative;
  top: -8vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BigOverview = styled.p`
  font-size: 1.5vw;
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
    y: -80,
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: "tween",
    },
  },
};

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

const offset = 6;

function Home() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const bigMovieMatch: PathMatch<string> | null = useMatch("/movie/:movieId");
  const { data: movieData, isLoading: isMovieLoading } = useQuery<IGetMoviesResult>(["movie", "nowPlaying"], fetchTrendingAll);
  console.log(movieData, isMovieLoading);
  console.log(bigMovieMatch);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const increaseIndex = () => {
    if (movieData) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = movieData.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1))

    }
  };

  const { isLoading: isTredingTvLoading, data: trendingTvData } = useQuery<ITrendMoviesResult>(
    ["trendTv", "trendingTv"], fetchTrendingTv
  );
  const { isLoading: isTredingMovieLoading, data: trendingMovieData } = useQuery<ITrendMoviesResult>(
    ["trendMovie", "trendingMovie"], fetchTrendingMovie
  );

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const onBoxClicked = (movieId: number) => {
    navigate(`/movie/${movieId}`)
  }

  const onOverlayClick = () => navigate("/");
  const clickedMovie = bigMovieMatch?.params.movieId && movieData?.results.find((movie) => movie.id + "" === bigMovieMatch.params.movieId);

  return (
    <Wrapper>
      {isMovieLoading ? (<h2>Loading...</h2>) : (
        <>
          <Banner onClick={increaseIndex} bgphoto={makeImagePath(movieData?.results[0].backdrop_path || "")}>
            <Title>{movieData?.results[0].title}</Title>
            <Overview>{movieData?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {movieData?.results
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
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
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
          </AnimatePresence>
        </>
      )}
      {/* <SliderForm /> */}
      <SliderTemplate isLoading={isTredingMovieLoading}
        data={trendingMovieData?.results.slice(0, 20)!}
        title="Trending Movie series" />
      <SliderTemplate isLoading={isTredingTvLoading}
        data={trendingTvData?.results.slice(0, 20)!}
        title="Trending TV series" />
    </Wrapper>


  )
}
export default Home;