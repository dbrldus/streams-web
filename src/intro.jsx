import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  background-color: #2a3638;
  height: 100vh;
  font-family: "Noto Sans KR", sans-serif;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Center = styled.div`
  display: block;
`;

const Title = styled.div`
  font-size: 100px;
  display: block;
`;

const TextInput = styled.input.attrs({ type: "text" })`
  color: white;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid black;
  font-size: 30px;
  transition: all 0.25s linear;
  margin: 5px;
  width: 200px;
  &:focus {
    border-bottom: 2px solid #89ffd2;
    outline: 0px;
  }
`;

const TextInputDiv = styled.div`
  margin-bottom: 40px;
`;

const LinkText = styled.span`
  font-size: 40px;
  text-shadow: 0px 0px 30px #89ffd2;
  a {
    color: #89ffd2;
    text-decoration: none;
  }
`;

const LeaderboardText = styled(LinkText)`
  font-size: 30px;
  position: absolute;
  top: 0;
  right: 0;
`;

function Intro() {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");

  const getNumberInput = (event) => {
    setNumber(event.target.value);
  };

  const getNameInput = (event) => {
    setName(event.target.value);
  };

  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Container>
        <Center>
          <Title>STREAMS WEB GAME</Title>
          <TextInputDiv>
            <TextInput
              onChange={getNumberInput}
              placeholder="학번"
              value={number}
            />
            <TextInput
              onChange={getNameInput}
              placeholder="이름"
              value={name}
            />
          </TextInputDiv>
          <LinkText>
            <Link to="/game" state={{ number, name }}>
              Go →
            </Link>
          </LinkText>
          <LeaderboardText>
            <Link to="/leaderboard">Leaderboard</Link>
          </LeaderboardText>
        </Center>
      </Container>
    </>
  );
}

export default Intro;
