import IView from "./IView.ts";

export default interface IInteractiveView extends IView {
    get isEnabled(): boolean;
    enable(): void;
    disable(): void;
}