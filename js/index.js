var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Square(props) {
  return React.createElement(
    'button',
    { className: props.classHighlight, onClick: props.onClick },
    props.value
  );
}

var Board = function (_React$Component) {
  _inherits(Board, _React$Component);

  function Board() {
    _classCallCheck(this, Board);

    return _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).apply(this, arguments));
  }

  _createClass(Board, [{
    key: 'renderSquare',
    value: function renderSquare(i) {
      var _this2 = this;

      var highlight = 'square';

      var _props$classHighlight = _slicedToArray(this.props.classHighlight, 1),
          a = _props$classHighlight[0];

      if (a) {
        a.forEach(function (x) {
          if (i === x) {
            highlight = 'square highlight';
          }
        });
      }

      return React.createElement(Square, {
        key: i,
        classHighlight: highlight,
        value: this.props.squares[i],
        onClick: function onClick() {
          return _this2.props.onClick(i);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var line = 3;
      var count = 0;
      var row = [];
      for (var i = 0; i < line; i++) {
        var col = [];
        for (var j = 0; j < line; j++) {
          col.push(this.renderSquare(count++));
        }
        row.push(React.createElement(
          'div',
          { className: 'board-row', key: i.toString() },
          col
        ));
      }

      return React.createElement(
        'div',
        null,
        row
      );
    }
  }]);

  return Board;
}(React.Component);

var Game = function (_React$Component2) {
  _inherits(Game, _React$Component2);

  function Game(props) {
    _classCallCheck(this, Game);

    var _this3 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    _this3.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
      coord: '',
      sortMove: -1
    };
    return _this3;
  }

  _createClass(Game, [{
    key: 'handleClick',
    value: function handleClick(i) {
      var history = this.state.history.slice(0, this.state.stepNumber + 1);
      var current = history[history.length - 1];
      var squares = current.squares.slice();
      var coord = this.getCoord(i);
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([{
          squares: squares,
          coord: coord
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });
    }
  }, {
    key: 'jumpTo',
    value: function jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: step % 2 === 0
      });
    }
  }, {
    key: 'getCoord',
    value: function getCoord(square) {
      var coord = ['0,0', '0,1', '0,2', '1,0', '1,1', '1,2', '2,0', '2,1', '2,2'];
      return coord[square];
    }
  }, {
    key: 'boldSelected',
    value: function boldSelected(state, move) {
      if (state === move) {
        return 'list-bold';
      }
      return '';
    }
  }, {
    key: 'sortMoves',
    value: function sortMoves() {
      this.setState({
        sortMove: this.state.sortMove * -1
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var history = this.state.history;
      var current = history[this.state.stepNumber];
      var winner = calculateWinner(current.squares);
      var moves = history.map(function (step, move) {
        var classBold = _this4.boldSelected(_this4.state.stepNumber, move);
        var desc = move ? 'Go to move #' + move + ' coord: ' + history[move].coord : 'Go to game start';
        return React.createElement(
          'li',
          { key: move },
          React.createElement(
            'button',
            { className: classBold, onClick: function onClick() {
                return _this4.jumpTo(move);
              } },
            desc
          )
        );
      });
      moves.sort(function () {
        return _this4.state.sortMove;
      });
      var status = void 0;
      var winners = [];
      if (winner) {
        winners.push(winner[1]);
        status = "Winner: " + winner[0];
      } else {
        if (this.state.stepNumber === 9) {
          status = 'Draw';
        } else {
          status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }
      }

      var sortTxt = this.state.sortMove === -1 ? 'Asc' : 'Desc';

      return React.createElement(
        'div',
        { className: 'game' },
        React.createElement(
          'div',
          { className: 'game-board' },
          React.createElement(Board, {
            classHighlight: winners,
            squares: current.squares,
            onClick: function onClick(i) {
              return _this4.handleClick(i);
            }
          })
        ),
        React.createElement(
          'div',
          { className: 'game-info' },
          React.createElement(
            'div',
            null,
            status
          ),
          React.createElement(
            'button',
            { onClick: function onClick() {
                return _this4.sortMoves();
              } },
            sortTxt
          ),
          React.createElement(
            'ol',
            null,
            moves
          )
        )
      );
    }
  }]);

  return Game;
}(React.Component);

// ========================================

ReactDOM.render(React.createElement(Game, null), document.getElementById("root"));

function calculateWinner(squares) {
  var lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  for (var i = 0; i < lines.length; i++) {
    var _lines$i = _slicedToArray(lines[i], 3),
        a = _lines$i[0],
        b = _lines$i[1],
        c = _lines$i[2];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      var result = [];
      result.push(squares[a]);
      result.push(lines[i]);
      return result;
    }
  }
  return null;
}