import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { number_pool, score_pool } from "./number_pool";
import Score from "./Score";

const Container = styled.div`
  padding: 0px 10px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 30px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2a3638;
  color: white;
`;

const BoardDiv = styled.div``;

const SystemDiv = styled.div`
  text-align: center;
  display: grid;
  margin-bottom: 100px;
`;

const ScoreDiv = styled.div`
  position: absolute;
  transform: translate(-50%, 0%);
  bottom: 0;
  left: 50%;
  text-align: center;
`;

const RerollButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 20px;
  margin: auto;
  padding: 5px;
  border: 0px;
  border-radius: 10px;
  background-color: #89ffd2;
  color: black;
  box-shadow: 0px 0px 70px #89ffd2;
`;

const SelectedNumber = styled.div`
  font-size: 100px;
`;

const NumberButton = styled.button`
  width: 70px;
  height: 70px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: ${(props) => (props.isActive ? "30px" : "18px")};
  color: ${(props) => (props.isActive ? "black" : "grey")};
  transform: ${(props) => (props.isActive ? "translate(0%, -20%)" : "grey")};
  transition: all 0.1s linear;
`;

const ScoreContainer = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: 150px 150px 150px 150px 150px;
  margin-bottom: 100px;
`;

function App() {
  const [pickedNum, setPickedNum] = useState();
  const [boardData, setBoardData] = useState([]);
  const [rerollCount, setRerollCount] = useState(3);
  const [numbers, setNumbers] = useState([...number_pool]);
  const [turnCount, setTurnCount] = useState(20);
  const [graveyard, setGraveyard] = useState([]);
  const { state } = useLocation();

  console.log(state);

  const reroll = () => {
    if (rerollCount > 0) {
      var graveyard_copy = [...graveyard];
      graveyard_copy.push(pickedNum);
      setGraveyard(graveyard_copy);

      setRerollCount((c) => c - 1);
      pickNumber();
    }
  };

  const pickNumber = () => {
    var pickIndex = Math.floor(Math.random() * numbers.length);
    setPickedNum(numbers[pickIndex]);

    var numbers_copy = [...numbers];
    numbers_copy = numbers_copy.filter((value, index) => index != pickIndex);
    setNumbers(numbers_copy);
  };

  const putNumberInBoard = (index) => {
    var board_Copy = [...boardData];
    if (board_Copy[index].value == "") {
      board_Copy[index].value = pickedNum;
      setBoardData(board_Copy);
      setTurnCount((c) => c - 1);
      pickNumber();
    }
  };

  useEffect(() => {
    pickNumber();

    var _boardData = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ].map((value) => {
      return { position: value, value: "" };
    });
    setBoardData(_boardData);
  }, []);

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
      {boardData.length == 0 ? (
        ""
      ) : (
        <Container>
          <div>
            <ScoreDiv>
              <div>Score</div>
              <ScoreContainer>
                {score_pool.map((value, index) => (
                  <div>
                    {index + 1} : +{value}
                  </div>
                ))}
              </ScoreContainer>
            </ScoreDiv>

            <SystemDiv>
              <SelectedNumber>{pickedNum}</SelectedNumber>
              <RerollButton onClick={reroll} disabled={rerollCount == 0}>
                다시 뽑기({rerollCount})
              </RerollButton>
              <div>버림 : {JSON.stringify(graveyard)}</div>
            </SystemDiv>
            <BoardDiv>
              {boardData.map((value, index) => (
                <NumberButton
                  key={value.position}
                  onClick={() => {
                    putNumberInBoard(index);
                  }}
                  isActive={value.value != ""}
                >
                  {value.value == "" ? value.position : value.value}
                </NumberButton>
              ))}
            </BoardDiv>
            {turnCount == 0 ? (
              <Score
                boardData={boardData}
                number={state.number}
                name={state.name}
              />
            ) : (
              ""
            )}
          </div>
        </Container>
      )}
    </>
  );
}

export default App;
