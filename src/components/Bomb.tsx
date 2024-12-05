import React, { useState, useEffect, MouseEvent } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  .App {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    color: #000;
    position: relative;
    z-index: 999;
    .board {
      display: grid;
      grid-template: repeat(10, 30px) / repeat(10, 30px);
      gap: 0;
      border: 3px solid #999;
      background: #999;
      padding: 0;
      user-select: none;

      .cell {
        box-sizing: border-box;
        width: 30px;
        height: 30px;
        background-color: #c0c0c0;
        border: 2px outset #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font: bold 14px/1 sans-serif;
        margin: 0;
        padding: 0;

        &.revealed {
          border: 1px solid #999;
          background-color: #e0e0e0;
        }

        &.mine {
          background-color: red;
        }

        &.flagged::after {
          content: "";
          width: 100%;
          height: 100%;
          background: url("/pixelart/flag.png") no-repeat center center / cover;
        }
      }
    }

    button {
      margin: 20px 0;
      padding: 10px 20px;
      font-size: 16px;
      font-family: "DungGeunMo";
      cursor: pointer;
    }

    h1,
    h2 {
      margin: 10px 0;
      font-family: "DungGeunMo";
    }
  }
`;

const size = 10; // 보드 크기
const minesCount = 10; // 지뢰 개수

type Cell = number | "M"; // 셀은 숫자이거나 지뢰("M")일 수 있음
type Board = Cell[][]; // 보드는 2차원 배열

const Bomb: React.FC = () => {
  const [board, setBoard] = useState<Board>([]); // 보드 상태
  const [revealed, setRevealed] = useState<boolean[][]>([]); // 공개된 셀 상태
  const [gameOver, setGameOver] = useState<boolean>(false); // 게임 종료 상태
  const [minesLeft, setMinesLeft] = useState<number>(minesCount); // 남은 지뢰 개수
  const [flagged, setFlagged] = useState<Set<string>>(new Set()); // 깃발이 꽂힌 셀

  useEffect(() => {
    initializeGame(); // 컴포넌트가 마운트될 때 게임 초기화
  }, []);

  const initializeGame = () => {
    const newBoard: Board = Array(size)
      .fill(null)
      .map(() => Array(size).fill(0)); // 보드 초기화
    const newRevealed: boolean[][] = Array(size)
      .fill(null)
      .map(() => Array(size).fill(false)); // 공개 상태 초기화

    placeMines(newBoard); // 지뢰 배치
    calculateNumbers(newBoard); // 숫자 계산

    setBoard(newBoard); // 보드 상태 업데이트
    setRevealed(newRevealed); // 공개 상태 업데이트
    setGameOver(false); // 게임 종료 상태 초기화
    setMinesLeft(minesCount); // 남은 지뢰 개수 초기화
    setFlagged(new Set()); // 깃발 상태 초기화
  };

  const placeMines = (newBoard: Board) => {
    let minesPlaced = 0; // 배치된 지뢰 수
    while (minesPlaced < minesCount) {
      const x = Math.floor(Math.random() * size); // 무작위 x 좌표
      const y = Math.floor(Math.random() * size); // 무작위 y 좌표
      if (newBoard[x][y] !== "M") {
        // 지뢰가 없는 경우
        newBoard[x][y] = "M"; // 지뢰 배치
        minesPlaced++; // 배치된 지뢰 수 증가
      }
    }
  };

  const calculateNumbers = (newBoard: Board) => {
    newBoard.forEach((row, x) => {
      row.forEach((cell, y) => {
        if (cell === "M") return; // 지뢰인 경우

        const mineCount = [-1, 0, 1].reduce((count, i) => {
          return (
            count +
            [-1, 0, 1].reduce((innerCount, j) => {
              const newX = x + i;
              const newY = y + j;
              if (
                newX >= 0 &&
                newX < size &&
                newY >= 0 &&
                newY < size &&
                newBoard[newX][newY] === "M"
              ) {
                return innerCount + 1; // 주변에 지뢰가 있는 경우
              }
              return innerCount;
            }, 0)
          );
        }, 0);

        newBoard[x][y] = mineCount; // 주변 지뢰 수 저장
      });
    });
  };

  const handleClick = (x: number, y: number, e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // 기본 우클릭 메뉴 방지

    if (gameOver) return; // 게임 종료 시 클릭 무시

    // 우클릭 처리 (깃발 표시)
    if (e.button === 2) {
      handleFlag(x, y);
      return;
    }

    // 이미 열려있거나 깃발이 꽂혀있는 셀은 클릭 무시
    if (revealed[x][y] || flagged.has(`${x},${y}`)) return;

    const newRevealed = [...revealed.map((row) => [...row])]; // 공개 상태 복사

    if (board[x][y] === "M") {
      // 지뢰 클릭 시
      setGameOver(true); // 게임 종료
      revealAll(); // 모든 셀 공개
      alert("게임 오버!"); // 게임 오버 알림
      return;
    }

    // 빈 셀 클릭 시 주변 셀 자동 오픈
    revealCell(x, y, newRevealed);
    setRevealed(newRevealed); // 공개 상태 업데이트

    // 승리 조건 체크
    checkWin(newRevealed);
  };

  const handleFlag = (x: number, y: number) => {
    if (revealed[x][y]) return; // 이미 공개된 셀은 무시

    const newFlagged = new Set(flagged); // 깃발 상태 복사
    const key = `${x},${y}`; // 셀 키 생성

    if (newFlagged.has(key)) {
      // 깃발이 이미 꽂혀있는 경우
      newFlagged.delete(key); // 깃발 제거
      setMinesLeft(minesLeft + 1); // 남은 지뢰 수 증가
    } else if (minesLeft > 0) {
      // 깃발이 없는 경우
      newFlagged.add(key); // 깃발 추가
      setMinesLeft(minesLeft - 1); // 남은 지뢰 수 감소
    }

    setFlagged(newFlagged); // 깃발 상태 업데이트
  };

  const revealCell = (x: number, y: number, newRevealed: boolean[][]) => {
    if (x < 0 || x >= size || y < 0 || y >= size || newRevealed[x][y]) return; // 범위 체크 및 이미 공개된 셀 확인

    newRevealed[x][y] = true; // 셀 공개

    if (board[x][y] === 0) {
      // 빈 셀인 경우
      // 주변 8방향의 셀을 재귀적으로 열기
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          revealCell(x + i, y + j, newRevealed); // 주변 셀 공개
        }
      }
    }
  };

  const revealAll = () => {
    setRevealed(
      Array(size)
        .fill(null)
        .map(() => Array(size).fill(true))
    ); // 모든 셀 공개
  };

  const checkWin = (newRevealed: boolean[][]) => {
    let unrevealedCount = 0; // 공개되지 않은 셀 수
    let mineCount = 0; // 지뢰 수
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (!newRevealed[i][j]) {
          // 공개되지 않은 셀 확인
          unrevealedCount++;
        }
        if (board[i][j] === "M") {
          // 지뢰 수 확인
          mineCount++;
        }
      }
    }
    // 모든 지뢰를 피하고 승리했는지 확인
    if (unrevealedCount === mineCount) {
      setGameOver(true);
      alert("축하합니다! 승리하셨습니다!");
    }
  };

  return (
    <Wrapper>
      <div className="App">
        <h1>지뢰찾기</h1>
        <h2>{gameOver ? "게임 종료" : `남은 지뢰 수: ${minesLeft}`}</h2>
        <div
          className="board"
          onContextMenu={(e) => e.preventDefault()} // 전체 보드에서 우클릭 메뉴 방지
        >
          {board.map((row, x) =>
            row.map((cell, y) => (
              <div
                key={`${x},${y}`}
                className={`cell ${
                  revealed[x][y]
                    ? cell === "M"
                      ? "mine"
                      : "revealed"
                    : flagged.has(`${x},${y}`)
                    ? "flagged"
                    : ""
                }`}
                onClick={(e) => handleClick(x, y, e)}
                onContextMenu={(e) => handleClick(x, y, e)}
              >
                {revealed[x][y] && cell !== "M" && cell}
              </div>
            ))
          )}
        </div>
        <button onClick={initializeGame}>다시 시작</button>
      </div>
    </Wrapper>
  );
};

export default Bomb;
