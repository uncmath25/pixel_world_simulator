import React from 'react';

import {Header} from './components/Header.jsx';
import {SimulationCanvas} from './components/SimulationCanvas.jsx';

const isPausedAtStart = true;

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isPaused: isPausedAtStart};
    this.simulationCanvasRef = React.createRef();
  }

  render() {
    return (
      <div>
        <Header isPaused={this.state.isPaused}
                changePaused={(isPaused) => this.changePaused(isPaused)}
                update={() => this.update()}
                restart={() => this.restart()}/>
        <SimulationCanvas ref={this.simulationCanvasRef}
                          isPausedAtStart={{isPausedAtStart}} />
      </div>
    );
  }

  restart() {
    // if (this.simulationCanvasRef.current === null) { return; }
    this.simulationCanvasRef.current.restart();
    this.setState({ isPaused: isPausedAtStart });
  }

  update() {
    this.simulationCanvasRef.current.update();
  }

  changePaused(isPaused) {
    if (this.simulationCanvasRef.current === null) { this.setState({ isPaused: !isPaused }); return; }
    this.setState({ isPaused: isPaused }, () => {
      if (this.state.isPaused) {
        this.simulationCanvasRef.current.pause()
      } else {
        this.simulationCanvasRef.current.resume()
      }
    });
  }
}
