export class CanvasDrawer {
  constructor(width, height, gridSize) {
    this.width = width;
    this.height = height;
    this.gridSize = gridSize;
  }

  draw(ctx, data) {
    this.clear(ctx);
    this.drawGrid(ctx, data);
    this.drawBoundary(ctx);
  }

  clear(ctx) {
    ctx.clearRect(0, 0, this.width, this.height);
  }

  drawGrid(ctx, data, color='#24a', width=2) {
    ctx.fillStyle = color;
    for (let x = 0; x < this.width / this.gridSize; x++) {
      for (let y = 0; y < this.height / this.gridSize; y++) {
        if (data[x][y] === 1) {
          ctx.rect(this.gridSize * x, this.gridSize * y, this.gridSize, this.gridSize);
        }
      }
    }
    ctx.fill();
  }

  drawBoundary(ctx, color='#000', lineWidth=2) {
    const boundaryEpsilon = 1;
    const width = this.width - boundaryEpsilon;
    const height = this.height - boundaryEpsilon;
    CanvasDrawer.drawLine(ctx, boundaryEpsilon, boundaryEpsilon, width, boundaryEpsilon, color, lineWidth);
    CanvasDrawer.drawLine(ctx, boundaryEpsilon, boundaryEpsilon, boundaryEpsilon, height, color, lineWidth);
    CanvasDrawer.drawLine(ctx, width, boundaryEpsilon, width, height, color, lineWidth);
    CanvasDrawer.drawLine(ctx, width, height, boundaryEpsilon, height, color, lineWidth);
  }

  static drawLine(ctx, startX, startY, endX, endY, color, width) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.closePath();
  }
}
