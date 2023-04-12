import { Figure, FigureNames } from "./Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";
import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/white-king.png";

export class King extends Figure {
  private isFirstStep: boolean;

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.isFirstStep = true;
    this.name = FigureNames.KING;
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
  }

  moveFigure(cell: Cell): void {
    super.moveFigure(this.cell);
    this.isFirstStep = false;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;

    const absX = Math.abs(target.x - this.cell.x);
    const absY = Math.abs(target.y - this.cell.y);

    if (
      (absX === 1 && absY === 1) ||
      (target.x === this.cell.x && target.y === this.cell.y + 1) ||
      (target.x === this.cell.x && target.y === this.cell.y - 1) ||
      (target.y === this.cell.y && target.x === this.cell.x + 1) ||
      (target.y === this.cell.y && target.x === this.cell.x - 1)
    ) {
      return true;
    }

    return false;
  }
}
