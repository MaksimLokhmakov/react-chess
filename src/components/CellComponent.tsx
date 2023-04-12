import React, { FC } from "react";
import { Cell } from "../models/Cell";

interface CellProps {
  cell: Cell;
  selectedCell: Cell | null;
  onClick: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({ cell, selectedCell, onClick }) => {
  return (
    <div
      onClick={() => onClick(cell)}
      className={[
        "cell",
        cell.color,
        selectedCell === cell && "cell-selected",
        cell.available && cell?.figure && "cell-cannock",
      ].join(" ")}
    >
      {cell.available && !cell?.figure && <div className="available" />}
      {cell.figure?.logo && <img src={cell.figure.logo} />}
    </div>
  );
};

export default CellComponent;
