import i18n from "../../i18n";
import MainToolbarItem from "./MainToolbarItem";
import MainToolbarItemIcon from "./MainToolbarItemIcon";
import { MainToolbarSeparatorItem } from "./items/MainToolbarSeparatorItem";

export default class MainToolbarItemFactory {

  public static shared: MainToolbarItemFactory = new MainToolbarItemFactory()

  public undo(): MainToolbarItem {
    return this.createItem({
      key: "undo",
      icon: {
        name: "arrow-counterclockwise",
      },
      enabled: false
    })
  }

  public redo(): MainToolbarItem {
    return this.createItem({
      key: "redo",
      icon: {
        name: "arrow-clockwise",
      },
      enabled: false
    })
  }
  
  public insert(): MainToolbarItem {
    return this.createItem({
      key: "insert",
      name: i18n.t("toolbar.insert"),
      canExpand: true,
      icon: {
        name: "plus-circle",
        color: "#000"
      }
    })
  }

  public body(): MainToolbarItem {
    return this.createItem({
      key: "body",
      name: i18n.t("toolbar.body"),
      canExpand: true,
    })
  }

  public font(): MainToolbarItem {
    return this.createItem({
      key: "font",
      name: i18n.t("menu.font"),
      canExpand: true,
    })
  }

  public fontSize(): MainToolbarItem {
    return this.createItem({
      key: "fontSize",
      name: i18n.t("menu.fontSize"),
      canExpand: true,
    })
  }

  public increaseFontSize(): MainToolbarItem {
    return this.createItem({
      key: "increaseFontSize",
      icon: {
        name: "plus-lg",
      },
    })
  }

  public decreaseFontSize(): MainToolbarItem {
    return this.createItem({
      key: "decreaseFontSize",
      icon: {
        name: "dash-lg",
      },
    })
  }

  public bold(): MainToolbarItem {
    return this.createItem({
      key: "bold",
      icon: {
        name: "type-bold",
      },
    })
  }

  public italic(): MainToolbarItem {
    return this.createItem({
      key: "italic",
      icon: {
        name: "type-italic",
      },
    })
  }

  public underline(): MainToolbarItem {
    return this.createItem({
      key: "underline",
      icon: {
        name: "type-underline",
      },
      expanded: true
    })
  }

  public strike(): MainToolbarItem {
    return this.createItem({
      key: "strike",
      icon: {
        name: "type-strikethrough",
      },
    })
  }

  public color(): MainToolbarItem {
    return this.createItem({
      key: "color",
      icon: {
        name: "eyedropper",
      },
    })
  }

  public highlight(): MainToolbarItem {
    return this.createItem({
      key: "highlight",
      icon: {
        name: "highlighter",
      },
    })
  }

  public colorPicker(): MainToolbarItem {
    return this.createItem({
      key: "colorPicker",
      icon: {
        name: "eyedropper",
      },
    })
  }

  public bulletList(): MainToolbarItem {
    return this.createItem({
      key: "bulletList",
      icon: {
        name: "list-ul",
      },
      canExpand: true,
    })
  }

  public numberedList(): MainToolbarItem {
    return this.createItem({
      key: "numberedList",
      icon: {
        name: "list-ol",
      },
      canExpand: true
    })
  }

  public indent(): MainToolbarItem {
    return this.createItem({
      key: "indent",
      icon: {
        name: "arrow-right",
      },
    })
  }

  public outdent(): MainToolbarItem {
    return this.createItem({
      key: "outdent",
      icon: {
        name: "arrow-left",
      },
    })
  }

  public align(): MainToolbarItem {
    return this.createItem({
      key: "align",
      icon: {
        name: "text-left",
      },
      canExpand: true
    })
  }

  public lineSpacing(): MainToolbarItem {
    return this.createItem({
      key: "lineSpacing",
      icon: {
        name: "arrows-expand",
      },
      canExpand: true
    })
  }

  public quote(): MainToolbarItem {
    return this.createItem({
      key: "quote",
      icon: {
        name: "quote",
      },
    })
  }

  public hightBlock(): MainToolbarItem {
    return this.createItem({
      key: "hightBlock",
      icon: {
        name: "marker-tip",
      },
    })
  }

  public more(): MainToolbarItem {
    return this.createItem({
      key: "more",
      icon: {
        name: "three-dots",
      },
    })
  }

  public search(): MainToolbarItem {
    return this.createItem({
      key: "search",
      icon: {
        name: "search",
      },
    })
  }

  public switchComplexity(): MainToolbarItem {
    return this.createItem({
      key: "switchComplexity",
      icon: {
        name: "chevron-down",
      },
    })
  }

  public separator(): MainToolbarItem {
    return new MainToolbarSeparatorItem()
  }

  createItem(item: any) {
    return new MainToolbarItem(
      item.key,
      item.name,
      item.canExpand,
      this.createIcon(item.icon),
      item.enabled ?? true
    )
  }

  createIcon(icon?: {name: string, color: string}) {
    if (!icon) return undefined
    return new MainToolbarItemIcon(icon.name, icon.color, "16px")
  }
}