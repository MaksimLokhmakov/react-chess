import logo from "../../assets/black-king.png";
import { Cell } from "../Cell";
import { Colors } from "../Colors";

export enum FigureNames {
  FIGURE = "Фигура",
  KING = "Король",
  KNIGHT = "Конь",
  PAWN = "Пешка",
  QUEEN = "Ферзь",
  ROOK = "Ладья",
  BISHOP = "Слон",
}

export class Figure {
  color: Colors;
  logo: typeof logo | null;
  cell: Cell;
  name: FigureNames;
  id: number;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.logo = null;
    this.name = FigureNames.FIGURE;
    this.cell.figure = this;
    this.id = Math.random();
  }

  canMove(target: Cell): boolean {
    if (this.color === target.figure?.color) return false;
    if (target.figure?.name === FigureNames.KING) return false;
    return true;
  }

  moveFigure(cell: Cell) {}
}
