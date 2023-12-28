import i18n from "../../../../i18n";
import ToolbarItem from "./ToolbarItem.ts";
import ToolbarItemIcon from "./ToolbarItemIcon.ts";
import { ToolbarSeparatorItem } from "./ToolbarSeparatorItem.ts";
import ColorIcon from "./impls/ColorIcon.ts";
import IToolbarItemIcon from "./IToolbarItemIcon.ts"
import ToolbarColorItem from "./ToolbarColorItem.ts";

interface IconOption {

  name: string

  color: string
}

export default class ToolbarItemFactory {

  public static shared: ToolbarItemFactory = new ToolbarItemFactory()

  public undo(): ToolbarItem {
    return this.createItem({
      key: "undo",
      icon: {
        name: "arrow-counterclockwise",
      },
      enabled: false
    })
  }

  public redo(): ToolbarItem {
    return this.createItem({
      key: "redo",
      icon: {
        name: "arrow-clockwise",
      },
      enabled: false
    })
  }
  
  public insert(): ToolbarItem {
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

  public styles(): ToolbarItem {
    const styles = this.createItem({
      key: "header",
      name: i18n.t("toolbar.styles"),
      canExpand: true,
    })
    styles.textWidth = 70
    return styles
  }

  public font(): ToolbarItem {
    const font = this.createItem({
      key: "fontFamily",
      name: i18n.t("menu.font"),
      canExpand: true,
    })
    font.textWidth = 100
    return font
  }

  public fontSize(): ToolbarItem {
    const size = this.createItem({
      key: "font-size",
      name: i18n.t("menu.fontSize"),
      canExpand: true,
    })

    size.textWidth = 30

    return size
  }

  public increaseFontSize(): ToolbarItem {
    return this.createItem({
      key: "increase-font-size",
      icon: {
        name: "plus-lg",
      },
    })
  }

  public decreaseFontSize(): ToolbarItem {
    return this.createItem({
      key: "decrease-font-size",
      icon: {
        name: "dash-lg",
      },
    })
  }

  public bold(): ToolbarItem {
    const bold = this.createItem({
      key: "bold",
      icon: {
        name: "type-bold",
      },
    })

    bold.description = "加粗(CTRL + B）"
    return bold
  }

  public italic(): ToolbarItem {
    return this.createItem({
      key: "italic",
      icon: {
        name: "type-italic",
      },
    })
  }

  public underline(): ToolbarItem {
    return this.createItem({
      key: "underline",
      icon: {
        name: "type-underline",
      },
      expanded: true
    })
  }

  public strike(): ToolbarItem {
    return this.createItem({
      key: "strike",
      icon: {
        name: "type-strikethrough",
      },
    })
  }

  public color(): ToolbarItem {
    return this.createItem(
      {
        key: "color",
        icon: new ColorIcon("fonts", "#FF0000"),
        canExpand: true,
        toggle: true,
        },
      ToolbarColorItem
    )
  }

  public highlight(): ToolbarItem {
    return this.createItem(
      {
        key: "background",
        icon: new ColorIcon("highlighter", "#FFFF00", "10px"),
        canExpand: true,
        toggle: true,
      },
      ToolbarColorItem
    )
  }

  public colorPicker(): ToolbarItem {
    return this.createItem({
      key: "colorPicker",
      icon: {
        name: "eyedropper",
      },
    })
  }

  public bulletList(): ToolbarItem {
    return this.createItem({
      key: "list",
      icon: {
        name: "list-ul",
      },
      // canExpand: true,
      // toggle: true
    })
  }

  public numberedList(): ToolbarItem {
    return this.createItem({
      key: "numberedList",
      icon: {
        name: "list-ol",
      },
      // canExpand: true
    })
  }

  public indent(): ToolbarItem {
    return this.createItem({
      key: "indent",
      icon: {
        name: "arrow-right",
      },
    })
  }

  public outdent(): ToolbarItem {
    return this.createItem({
      key: "outdent",
      icon: {
        name: "arrow-left",
      },
    })
  }

  public align(): ToolbarItem {
    return this.createItem({
      key: "align",
      icon: {
        name: "text-left",
      },
      canExpand: true
    })
  }

  public lineSpacing(): ToolbarItem {
    return this.createItem({
      key: "lineSpacing",
      icon: {
        name: "arrows-expand",
      },
      canExpand: true
    })
  }

  public quote(): ToolbarItem {
    return this.createItem({
      key: "blockquote",
      icon: {
        name: "quote",
      },
    })
  }

  public hightBlock(): ToolbarItem {
    return this.createItem({
      key: "hightBlock",
      icon: {
        name: "marker-tip",
      },
    })
  }

  public more(): ToolbarItem {
    return this.createItem({
      key: "more",
      icon: {
        name: "three-dots",
      },
    })
  }

  public search(): ToolbarItem {
    return this.createItem({
      key: "search",
      icon: {
        name: "search",
      },
    })
  }

  public switchComplexity(): ToolbarItem {
    return this.createItem({
      key: "switchComplexity",
      icon: {
        name: "chevron-down",
      },
    })
  }

  public separator(): ToolbarItem {
    return new ToolbarSeparatorItem()
  }

  createItem(item: any, itemClass: typeof ToolbarItem | typeof ToolbarColorItem = ToolbarItem): ToolbarItem {
    return new itemClass(
      item.key,
      item.name,
      item.canExpand,
      this.createIcon(item.icon),
      item.enabled ?? true,
      item.toggle,
    )
  }

  createIcon(icon?: IconOption | IToolbarItemIcon | undefined): IToolbarItemIcon | undefined {
    if (!icon) return undefined

    if ((icon as any)['name'] === undefined) return icon as IToolbarItemIcon

    // @ts-ignore
    return new ToolbarItemIcon(icon.name, icon.color, "16px")
  }
}