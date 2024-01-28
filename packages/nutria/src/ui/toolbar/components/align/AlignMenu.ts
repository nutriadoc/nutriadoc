import Menu from "../../../menu/Menu.ts";
import Position from "../../../../../../classes/src/ui/floating/Position.ts";
import MenuItem from "../../../menu/MenuItem.ts";
import DefaultMenuItem from "../../../menu/DefaultMenuItem.ts";
import i18n from "i18next";

export default class AlignMenu extends Menu {
  public constructor() {
    super('align', Position.BottomLeft, AlignMenu.createItems());
  }

  static createItems(): MenuItem[] {
    const t = i18n.t;
    return [
      new DefaultMenuItem('left', t('menu.align.left'), false, 'text-left'),
      new DefaultMenuItem('center', t('menu.align.center'), false, 'text-center'),
      new DefaultMenuItem('right', t('menu.align.right'), false, 'text-right'),
      new DefaultMenuItem('justify', t('menu.align.justify'), false, 'justify'),
    ];
  }
}