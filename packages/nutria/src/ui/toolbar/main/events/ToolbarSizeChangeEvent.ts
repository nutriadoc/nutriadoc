export default class ToolbarSizeChangeEvent extends Event {

  public static readonly type = "TOOLBAR_SIZE_CHANGE_EVENT"

  public constructor() {
    super(ToolbarSizeChangeEvent.type)
  }
}