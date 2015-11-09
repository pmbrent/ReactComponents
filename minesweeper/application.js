var M = Minesweeper;

var Game = React.createClass({
  getInitialState: function() {
    return {
      board: new M.Board(this.props.gridSize, this.props.numBombs),
      gameOver: false,
      gameWon: false
    };
  },
  updateGame: function(tile, reveal) {
    reveal ? tile.explore() : tile.toggleFlag();

    this.setState({
      gameWon: this.state.board.won(),
      gameOver: this.state.board.won() || this.state.board.lost()
    });
  },
  resetGame: function() {
    this.setState({
      board: new M.Board(this.props.gridSize, this.props.numBombs),
      gameOver: false,
      gameWon: false
    });
  },
  render: function() {
    var result = "";
    if (this.state.gameOver) {
      result = (this.state.gameWon ? "Congratulations! You Win!" : "Try again...");
    }
    return (
      <div className="container">
        <div className={this.state.gameOver ? "modal gameOver" : "modal"}>
          <div className="modalContent">
            <p>{result}</p>
            <button onClick={this.resetGame}>Play again!</button>
          </div>
        </div>
        <Board board={this.state.board} gameOver={this.state.gameOver}
          updateGame={this.updateGame} />
      </div>
    );
  }
});

var Board = React.createClass({
  render: function() {
      var tiles = this.props.board.grid.map(function(row, rowIdx) {
        var gridSize = this.props.board.gridSize;
        return(
          <div className="row group">
            {row.map(function(tile, idx) {
              var tileIdx = rowIdx * gridSize + idx;
              return (
                <Tile key={tileIdx} tile={tile}
                  updateGame={this.props.updateGame}
                  gameOver={this.props.gameOver}
                />
              );
            }, this)}
          </div>
        );
      }, this);
    return (
      <div>
        <h1>Minesweeper!</h1>
        <div className="game">
          {tiles}
        </div>
      </div>
    );
  }
});

var Tile = React.createClass({
  render: function() {
    var content, tile = this.props.tile, className = "tile";

    if (this.props.gameOver && tile.bombed) {
      content = "💣";
      className += " bombed revealed";
    } else if (tile.explored) {
      className += " revealed";
      if (tile.bombed) {
        content = "💣";
        className += " bombed";
      } else {
        content = tile.adjacentBombCount().toString();
      }
    } else if (tile.flagged) {
      content = "⚑";
      className += " flagged";
    } else {
      content = " ";
    }

    return (
      <div className={className} onClick={this.handleClick} onContextMenu={this.handleClick}>
        {content}
      </div>
    );
  },
  handleClick: function(e) {
    if (this.props.gameOver) return;
    e.preventDefault();

    switch (e.nativeEvent.which) {
      case 1:
        this.props.updateGame(this.props.tile, true);
        break;
      case 3:
        this.props.updateGame(this.props.tile, false);
        break;
    }
  }
});
