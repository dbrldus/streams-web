import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { score_pool } from "./number_pool";

const BackButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 20px;
  margin-left: 30px;
  padding: 5px;
  border: 0px;
  border-radius: 10px;
  background-color: #89ffd2;
`;

function Score({ boardData, number, name }) {
  const [score, setScore] = useState(0);
  const [toHome, setToHome] = useState(false);

  const getScore = () => {
    var data = boardData.map((value) => value.value);
    var _score_ = 0;
    var j_index = data.indexOf("J");
    if (j_index == -1) {
      _score_ = calcScore(data);
    } else if (j_index == 0) {
      data[j_index] = data[j_index + 1];
      _score_ = calcScore(data);
    } else if (j_index == 19) {
      data[j_index] = data[j_index - 1];
      _score_ = calcScore(data);
    } else {
      data[j_index] = data[j_index + 1];
      var score_v1 = calcScore(data);

      data[j_index] = data[j_index - 1];
      var score_v2 = calcScore(data);

      _score_ = Math.max(score_v1, score_v2);
    }
    setScore(_score_);
  };

  const calcScore = (array) => {
    var _score = 0;
    var num = 1;
    for (var i = 0; i < 19; i++) {
      if (array[i] <= array[i + 1]) {
        num += 1;
      } else {
        _score += score_pool[num - 1];
        num = 1;
      }
    }
    _score += score_pool[num - 1];

    return _score;
  };

  const saveScore = () => {
    var data = JSON.parse(localStorage.getItem("LeaderBoard") ?? "[]");
    if (data.length != 0) {
      var data_1 = data.filter((value) => value.score >= score);
      var data_2 = data.filter((value) => value.score < score);
      data = [...data_1, { number, name, score }, ...data_2];
    } else {
      data.push({ number, name, score });
    }

    localStorage.setItem("LeaderBoard", JSON.stringify(data));
    setToHome(true);
  };

  useEffect(() => {
    getScore();
  }, []);

  return (
    <>
      {toHome ? (
        <Navigate to="/" />
      ) : (
        <div>
          {number} {name} Score : {score}
          <BackButton onClick={saveScore}>Back</BackButton>
        </div>
      )}
    </>
  );
}

export default Score;
