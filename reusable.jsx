// Simple drawing on HTML5 Canvas.
// use inline styles


class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.clear = this.clear.bind(this);
    this._paintSmile = this._paintSmile.bind(this);
    this.paintSmile = this.paintSmile.bind(this);
    this.drawName = this.drawName.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.state = {
      smileDrawn: false,

      hovered: false,
    }

    this.styles = {
      normal: {
        boxShadow: '0 0 0 1px #ddd',
        transition: 'box-shadow 0.5s ease-in',
      },

      hover: {
        boxShadow: '0 0 0 1px #000',
        transition: 'box-shadow 2s ease-out',
      }
    };
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.smileDrawn) {
      this._paintSmile();
    }
  }

  clear() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, 400, 400);
    this.setState({smileDrawn: false});
  }

  _paintSmile() {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(75,75,50,0,Math.PI*2,true); // Outer circle
    ctx.moveTo(110,75);
    ctx.arc(75,75,35,0,Math.PI,false);  // Mouth (clockwise)
    ctx.moveTo(65,65);
    ctx.arc(60,65,5,0,Math.PI*2,true);  // Left eye
    ctx.moveTo(95,65);
    ctx.arc(90,65,5,0,Math.PI*2,true);  // Right eye
    ctx.stroke();
    this.setState({smileDrawn: true});
  }

  paintSmile() {
    if (!this.state.smileDrawn) {
      this._paintSmile();
    }
  }

  drawName(name) {
    this.clear()
    const ctx = this.ctx;
    ctx.font = '48 px serif';
    ctx.textAlign = 'center';
    ctx.fillText(name, 75, 150);
  }

  handleMouseEnter(event) {
    this.setState({hovered: true});
  }

  handleMouseLeave(event) {
    this.setState({hovered: false});
  }

  render() {
    return (
      <canvas
        width="400"
        height="400"
        ref={(e) => this.canvas = e}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={this.state.hovered ? this.styles.hover : this.styles.normal}
      />
    );
  }
}


class PaintButton extends React.Component {
  constructor(props) {
    super(props);
    this.style = {
      padding: '14px 24px',
      border: '0 none',
      fontWeight: '700',
      letterSpacing: 1,
      textTransform: 'uppercase',
    };
  }

  render() {
    return (
      <button
        type="button"
        onClick={this.props.onClick}
        style={this.style}
      >
        Paint smile
      </button>
    );
  }
}
PaintButton.propTypes = {
  onClick: React.PropTypes.func.isRequired,
}


class NameInput extends React.Component {
  constructor(props) {
    super(props);
    this.style = {
      borderWidth: 1,
      borderColor: '#ddd',
      borderStyle: 'solid',
      borderRadius: 3,
      display: 'inline-block',
      height: 40,
      width: 255,
      fontSize: 18,
    };
  }

  render() {
    return (
      <input name="name" type="text" onChange={this.props.onChange} style={this.style} />
    );
  }
}
NameInput.propTypes = {
  onChange: React.PropTypes.func.isRequired,
}


class InputContainer extends React.Component {
  constructor(props) {
    super(props);
    this.style = {
      border: '1px solid black',
      width: 400,
    };
  }

  render() {
    return (
      <div style={this.style}>
        <PaintButton onClick={this.props.handlePaintSmileBtnClick} />
        <NameInput onChange={this.props.handleNameInputChange} />
      </div>
    );
  }
}
InputContainer.propTypes = {
  handleNameInputChange: React.PropTypes.func.isRequired,
  handlePaintSmileBtnClick: React.PropTypes.func.isRequired,
}



class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handlePaintSmileBtnClick = this.handlePaintSmileBtnClick.bind(this);
    this.style = {
      width: 420,
      padding: 10,
      overflow: 'auto',
    };
  }

  handleNameInputChange(event) {
    const name = event.target.value;
    this.canvas.drawName(name);
  }

  handlePaintSmileBtnClick(event) {
    this.canvas.paintSmile(); 
  }

  render() {
    return (
      <div style={this.style}>
        <Canvas ref={(c) => this.canvas = c} />
        <InputContainer
          handleNameInputChange={this.handleNameInputChange}
          handlePaintSmileBtnClick={this.handlePaintSmileBtnClick}
        />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('container'));
