import React from 'react';
import Board from './Board';
import History from './History';
import calculateWinner from './utils/calculateWinner';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    /*
      1. Fix overriding squares if button clicked
      2. Fix overriding squares if game is over
    */
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{ squares: squares }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    let status;

    const history = this.state.history; // List of squares history
    const current = history[this.state.stepNumber]; // Last index of history
    const winner = calculateWinner(current.squares); // Get squares object

    if (winner) {
      status = 'Winner player : ' + winner;
    } else {
      status = 'Next player : ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <>
        <div className="status">{status}</div>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <History history={history} onClick={(i) => this.jumpTo(i)} />
          </div>
        </div>
      </>
    );
  }
}

export default Game;
