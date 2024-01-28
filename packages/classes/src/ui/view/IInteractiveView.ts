import { IView } from "./index.ts"

export default interface IInteractiveView extends IView {
    get isEnabled(): boolean;
    enable(): void;
    disable(): void;
}