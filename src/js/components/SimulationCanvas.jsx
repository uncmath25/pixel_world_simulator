import React from 'react';

import {CanvasDrawer} from '../simulation/CanvasDrawer.js';
import {Simulation} from '../simulation/Simulation.js';

const canvasWidth = 1600;
const canvasHeight = 800;
const gridSize = 10;
const updateInterval = 300;
const topMargin = 50;

export class SimulationCanvas extends React.Component {
  constructor(props) {
    super(props);
    console.time('Initializing the simulation...')
    this.simulation = new Simulation(canvasWidth / gridSize, canvasHeight / gridSize);
    this.canvasDrawer = new CanvasDrawer(canvasWidth, canvasHeight, gridSize);
    console.timeEnd('Initializing the simulation...')
    if (!this.props.isPausedAtStart) { this.resume(); }
  }

  render() {
    console.log('Rerendering...')
    return (
      <div style={{textAlign: 'center', marginTop: topMargin}}>
        <canvas ref={(canvas) => this.assignCanvasRef(canvas)} width={canvasWidth} height={canvasHeight}></canvas>
      </div>
    );
  }

  assignCanvasRef(canvas) {
    if (canvas !== null) {
      console.log('Reassigning canvas ref...')
      this.ctx = canvas.getContext('2d');
      this.drawCanvas();
    }
  }

  drawCanvas() {
    if (this.ctx === null) { return; }
    console.time('Drawing the simulation...')
    this.canvasDrawer.draw(this.ctx, this.simulation.getData());
    console.timeEnd('Drawing the simulation...')
  }

  pause() {
    console.log('Pausing the simulation...');
    clearInterval(this.updateInterval);
  }

  resume() {
    console.log('Resuming the simulation...');
    this.updateInterval = setInterval(() => this.update(), updateInterval);
  }

  update() {
    console.time('Updating the simulation...')
    this.simulation.update();
    this.drawCanvas();
    console.timeEnd('Updating the simulation...')
  }

  restart() {
    this.pause()
    this.simulation.reset();
    this.drawCanvas();
    if (!this.props.isPausedAtStart) { this.resume(); }
  }
}
