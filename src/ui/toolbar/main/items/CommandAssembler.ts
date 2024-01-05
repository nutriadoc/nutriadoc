import ToolbarItem from "./ToolbarItem.ts"
import MenuItem from "../../../menu/MenuItem.ts";
import Menu from "../../../menu/Menu.ts";
import DocumentCommandType from "../../../../document/commands/DocumentCommandType.ts";
import DocumentCommand from "../../../../document/commands/DocumentCommand.ts";
import ParameterlessDocumentCommand from "../../../../document/commands/ParameterlessDocumentCommand.ts";

export default class CommandAssembler {
  toCommand(item: ToolbarItem | Menu, menuItem?: MenuItem): DocumentCommand {
    if (item instanceof ToolbarItem) {
      return this.fromToolbarItem(item)
    }
    return this.fromMenu(item, menuItem!)
  }

  fromMenu(menu: Menu, menuItem: MenuItem): DocumentCommand {
    switch (menu.key) {
      case "insert": {
        if (menuItem.key == "image") {
          return new ParameterlessDocumentCommand(DocumentCommandType.SelectImage)
        }
        break
      }
    }

    return new ParameterlessDocumentCommand(DocumentCommandType.Unknown)
  }

  fromToolbarItem(item: ToolbarItem): DocumentCommand {
    let command: DocumentCommand
    switch (item.key) {
      case "redo": {
        command = new ParameterlessDocumentCommand(DocumentCommandType.Redo)
        break
      }
      case "undo": {
        command = new ParameterlessDocumentCommand(DocumentCommandType.Undo)
        break
      }
      default: {
        command = new ParameterlessDocumentCommand(DocumentCommandType.Unknown)
        break
      }
    }
    return command
  }
}