import { Figure, FigureNames } from "./Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";
import blackLogo from "../../assets/black-pawn.png";
import whiteLogo from "../../assets/white-pawn.png";

export class Pawn extends Figure {
  private isFirstStep: boolean;

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.isFirstStep = true;
    this.name = FigureNames.PAWN;
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
  }

  moveFigure(cell: Cell): void {
    super.moveFigure(this.cell);
    this.isFirstStep = false;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;

    const diraction = this.color === Colors.BLACK ? -1 : 1;
    const firstStepDirection = this.color === Colors.BLACK ? -2 : 2;

    if (
      target.x === this.cell.x &&
      (target.y === this.cell.y + diraction ||
        (this.isFirstStep &&
          target.y === this.cell.y + firstStepDirection &&
          target.board.getCell(target.x, target.y - diraction).isEmpty())) &&
      target.isEmpty()
    ) {
      return true;
    }

    if (
      target.y === this.cell.y + diraction &&
      (target.x === this.cell.x + diraction ||
        target.x === this.cell.x - diraction) &&
      this.cell.isEnemy(target)
    ) {
      return true;
    }

    return false;
  }
}
