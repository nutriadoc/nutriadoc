import GridCell from "./GridCell.ts";
import GridPicker from "./GridPicker.ts";

export default class GridPickerEvent extends Event {

  protected _picker: GridPicker

  protected _cell: GridCell

  public constructor(picker: GridPicker, cell: GridCell) {
    super("pick");

    this._picker = picker;
    this._cell = cell;
  }

  public get picker(): GridPicker {
    return this._picker;
  }

  public get cell(): GridCell {
    return this._cell;
  }
}