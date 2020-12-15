import React from 'react';
import Square from './Square'
import './Game.css';

let start
const squaresPerRow = 3
class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: new Array(9).fill(),
      player: 'X',
      result: null
    }
  }
  componentDidMount() {
    console.log("Game Did Mount");
  }
  componentDidUpdate() {
    console.log("Game Did Update");
  }

  renderRows = () => {
    start = 0
    const rowArr = []
    for(let i=1; i<=squaresPerRow; i++) {
      rowArr.push(
      <div key={i} className="center-align">
        {this.renderSquare()}
      </div>
      )
    }
    return rowArr
  }
  renderSquare = () => {
    const {data} = this.state
    const squareArr = []
    for(let i=start; i<start+squaresPerRow; i++) {
      squareArr.push(<Square key={i} value={data[i]} onClick={() => this.handleClick(i)}/>)
    }
    start = start + squaresPerRow
    return squareArr
  }
  handleClick = (index) => {
    const {player, data, result} = this.state
    if(!data[index] && !result) {
      const tempData = [...data]
      tempData[index] = player
      let checkResult = this.checkResult(tempData)
      if (checkResult) {
        checkResult = 'Winner: ' + checkResult
      } else if (!tempData.includes(undefined)) {
        checkResult = 'Game Drawn'
      } 
      this.setState({
        data: tempData,
        player: player === 'X' ? 'O' : 'X',
        result: checkResult
      })
    }
  }
  checkResult = (data) => {
    const pos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < pos.length; i++) {
      const [a, b, c] = pos[i];
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        return data[a];
      }
    }
  }
  render() {
    const {player, result} = this.state
    return (
      <div className="container center-align">
          <div className={`title ${result ? 'success bold' : ''}`}>{result ? result : "Player: "+player}</div>
          {this.renderRows()}
      </div>
    )
  }
}

export default Game;
