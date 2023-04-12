import { Figure, FigureNames } from "./Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";
import blackLogo from "../../assets/black-rook.png";
import whiteLogo from "../../assets/white-rook.png";

export class Rook extends Figure {
  private isFirstStep: boolean;

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.isFirstStep = true;
    this.name = FigureNames.ROOK;
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
  }

  moveFigure(cell: Cell): void {
    super.moveFigure(this.cell);
    this.isFirstStep = false;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;
    if (this.cell.isEmptyVertical(target)) return true;
    if (this.cell.isEmptyHorizontal(target)) return true;
    return false;
  }
}
