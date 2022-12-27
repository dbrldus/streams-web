import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";

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

function LeaderBoard() {
  const [data, setData] = useState([]);
  const [back, setBack] = useState(false);

  const loadLeaderBoard = () => {
    var savedData = JSON.parse(localStorage.getItem("LeaderBoard")) ?? [];
    var filtered = savedData.filter((value, index) => index < 10);
    setData(filtered);
  };

  const clickBackBtn = () => {
    setBack(true);
  };

  useEffect(() => {
    loadLeaderBoard();
  }, []);

  return (
    <>
      {back ? (
        <Navigate to="/"></Navigate>
      ) : (
        <Container>
          <div>
            <div>Leaderboard</div>
            <div>
              {data.length == 0
                ? "None"
                : data.map((value, index) => (
                    <div key={index}>
                      {index + 1}. {value.number} {value.name} {value.score}
                    </div>
                  ))}
            </div>
            <button onClick={clickBackBtn}>Back</button>
          </div>
        </Container>
      )}
    </>
  );
}

export default LeaderBoard;
