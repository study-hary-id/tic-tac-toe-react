import React from 'react';

class History extends React.Component {
  render() {
    const history = this.props.history;
    const moves = history.map((step, move) => {
      const text = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button className="button-info">{text}</button>
        </li>
      );
    });

    return <ol>{moves}</ol>;
  }
}

export default History;
