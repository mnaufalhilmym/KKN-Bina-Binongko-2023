import { Accessor, Setter, createSignal } from "solid-js";

export default class LoadingState {
  private static _isLoading: Accessor<boolean>;
  private static _setIsLoading: Setter<boolean>;

  static init(loadingState: boolean) {
    [this._isLoading, this._setIsLoading] = createSignal(loadingState);
  }

  static get state(): any {
    return this._isLoading;
  }

  static set state(loadingState: boolean) {
    this._setIsLoading(loadingState);
  }
}
