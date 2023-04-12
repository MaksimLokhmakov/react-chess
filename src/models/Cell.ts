import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";
import { Board } from "./Board";

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  board: Board;
  available: boolean; // ? доступна ли для перемещения
  id: number;

  constructor(
    board: Board,
    x: number,
    y: number,
    color: Colors,
    figure: Figure | null
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.board = board;
    this.available = false;
    this.id = Math.random();
  }

  isEmpty(): boolean {
    if (this.figure) return false;

    return true;
  }

  isEnemy(target: Cell): boolean {
    if (target.figure) return this.figure?.color !== target.figure.color;

    return false;
  }

  isEmptyDiagonals(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);

    if (absX !== absY) return false;

    const dy = this.y < target.y ? 1 : -1;
    const dx = this.x < target.x ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.x + i * dx, this.y + i * dy).isEmpty())
        return false;
    }

    return true;
  }

  isEmptyHorizontal(target: Cell): boolean {
    if (this.y !== target.y) return false;

    const max = Math.max(target.x, this.x);
    const min = Math.min(target.x, this.x);
    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmpty()) return false;
    }

    return true;
  }

  isEmptyVertical(target: Cell): boolean {
    if (this.x !== target.x) return false;

    const max = Math.max(target.y, this.y);
    const min = Math.min(target.y, this.y);
    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) return false;
    }

    return true;
  }

  setFigure(figure: Figure): void {
    this.figure = figure;
    this.figure.cell = this;
  }

  moveFigure(target: Cell): void {
    if (this?.figure?.canMove(target)) {
      this.figure.moveFigure(target);
      target.setFigure(this.figure);
      this.figure = null;
    }
  }
}
