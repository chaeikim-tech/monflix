import { styled } from "styled-components";
import Card from "./Card";
import React, { useState } from "react";
import { IData } from "../api";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


const Container = styled.div`
  width: 100%;
  background-color: black;
  position: relative;
  color: ${(props) => props.theme.gray.lighter};
  margin: 1rem;
  aspect-ratio: 100 / 32;
  & .sideBtn {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }
  &:hover {
    .sideBtn {
      opacity: 1;
    }
  }
`;
const Title = styled.h2`
  font-size: 2vw;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.gray.lighter};
  display: flex;
`;

const Slider = styled(motion.div)`
  display: grid;
  position: absolute;
  top: 11%;
  width: 90%;
  grid-template-columns: repeat(5, 1fr);
  gap: 1%;
`;

const SliderBtn = styled.div`
  position: absolute;
  width: 5%;
  height: 90%;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.gray.darker};
  transition: color 0.2s ease-in-out;
  background-color: rgba(5, 5, 5, 0.7);
  &:hover {
    color:${(props) => props.theme.gray.lighter};
    cursor: pointer;
  }
`;
const LeftCard = styled.div`
  position: absolute;
  left: -20%;
  width: 19%;
`;

const RightCard = styled.div`
  position: absolute;
  right: -20%;
  width: 19%;
`;

const BtnContainer = styled.div`
  position: absolute;
  width: 20%;
  font-size: 80%;
  top: 4%;
  right: 5%;
  display: flex;
  justify-content: end;
`;

const SliderVariants = {
    initial: (isBack: boolean) => {
        return { x: isBack ? "-101%" : "101%" };
    },
    animate: {
        x: "0",
        transition: {
            duration: 0.3,
            ease: "easeInOut",
        },
    },
    exit: (isBack: boolean) => {
        return {
            x: isBack ? "101%" : "-101%",
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        };
    },
};

function SliderTemplate({
    isLoading,
    data,
    title,
    category,
}: {
    isLoading: boolean;
    data: IData[];
    title: string;
    category?: "movie" | "tv";
}) {
    const contents = data?.slice(0, 20);
    const [order, setOrder] = useState(0);
    const [isBack, setIsBack] = useState(false);
    const [isSliding, setIsSliding] = useState(false);
    const handleForwardClick = () => {
        if (isSliding) return;
        setIsBack(false);
        setOrder((prev) => (prev === 3 ? 3 : prev + 1));
        setIsSliding(true);
    };
    const handleBackwardClick = () => {
        if (isSliding) return;
        setIsBack(true);
        setOrder((prev) => (prev === 0 ? 0 : prev - 1));
        setIsSliding(true);
    };
    return (
        <>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <Container>
                    <Title>{title}</Title>
                    <AnimatePresence
                        initial={false}
                        onExitComplete={() => setIsSliding(false)}
                        custom={isBack}
                    >
                        <Slider
                            custom={isBack}
                            variants={SliderVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key={order}
                        >
                            {order !== 0 ? (
                                <LeftCard>
                                    <Card data={contents[order * 5 - 1]}></Card>
                                </LeftCard>
                            ) : null}
                            {contents.slice(order * 5, order * 5 + 5).map((content, i) => (
                                <Card key={i} data={content} />
                            ))}
                            {order !== 3 ? (
                                <RightCard>
                                    <Card
                                        data={contents[order * 5 + 5]}
                                        category={category}
                                    ></Card>
                                </RightCard>
                            ) : null}
                        </Slider>
                    </AnimatePresence>
                    <div className="sideBtn">
                        <BtnContainer />
                        <AnimatePresence>
                            {order !== 0 ? (
                                <SliderBtn
                                    key={"arrbtn1"}
                                    onClick={handleBackwardClick}
                                    style={{ left: 0 }}
                                >
                                    <IoIosArrowBack style={{ fontSize: '150%' }} />
                                </SliderBtn>
                            ) : null}
                            {order !== 3 ? (
                                <SliderBtn
                                    key={"arrbtn2"}
                                    onClick={handleForwardClick}
                                    style={{ right: '1rem' }}
                                >
                                    <IoIosArrowForward style={{ fontSize: '150%' }} />
                                </SliderBtn>
                            ) : null}
                        </AnimatePresence>
                    </div>
                </Container>
            )}
        </>
    );
}

export default SliderTemplate;