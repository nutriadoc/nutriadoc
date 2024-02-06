import {View} from "@nutriadoc/classes"
import RouterListener from "./RouterListener"
import Router from "./Router"
import Route from "./Route"
import Cargo from "./Cargo";

type ViewType = typeof View

export default class RouterContainer extends View implements RouterListener<typeof View> {

  protected _router: Router<ViewType>

  protected actions: WeakMap<Cargo<ViewType>, View> = new WeakMap<Cargo<ViewType>, View>()

  constructor(...units: object[]) {
    super(undefined, ...units)

    this._router = new Router(
      Route.loadRoutes<ViewType>(units.map(unit => unit as any))
    )
    this._router.addListener(this)

    this.displayEntrypoint()
  }

  protected displayEntrypoint() {
    const cargo = this._router.getCurrentCargo()
    this._router.appear(cargo)
  }

  appear(cargo: Cargo<typeof View>): void {
    this.removeAllChild()

    const view = new cargo.route.component()
    if ('history' in view) {
      view['history'] = this._router.history
    }

    if ('parameters' in view)
      view['parameters'] = cargo.parameters

    this.actions.set(cargo, view)

    this.add(view)
  }

  pop(removing: Cargo<ViewType>, current: Cargo<ViewType>): void {
    const view = this.actions.get(removing)
    this.actions.delete(removing)
    view.remove()

    const currentView = this.actions.get(current)
    this.add(currentView)
  }

  get router(): Router<ViewType> {
    return this._router
  }
}