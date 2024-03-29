import {
  Accessor,
  createSignal,
  JSX,
  JSXElement,
  Owner,
  runWithOwner,
  Setter,
} from "solid-js";
import styles from "../../styles/centerModal.module.css";

interface Config {
  owner: Owner | null;
  cardClass?: string;
  cancelCallback?: () => void;
}

export default class CenterModalWrapper {
  private _config: Config;
  private _getIsShow: Accessor<boolean>;
  private _setIsShow: Setter<boolean>;
  private _getContent: Accessor<JSXElement>;
  private _setContent: Setter<JSXElement>;

  constructor(config: Config) {
    this._config = config;
    [this._getIsShow, this._setIsShow] = createSignal(false);
    [this._getContent, this._setContent] = createSignal();
  }

  get isShow(): any {
    return this._getIsShow;
  }

  set isShow(state: boolean) {
    this._setIsShow(state);
  }

  get content(): any {
    return this._getContent;
  }

  set content(
    content:
      | { element: (...props: any) => JSX.Element; props: any[] }
      | undefined
  ) {
    runWithOwner(this._config.owner, () => {
      this._setContent(content?.element(...content.props));
    });
  }

  render() {
    const closeModal = () => {
      this.isShow = false;
      this._config?.cancelCallback?.();
    };

    function stopPropagation(
      e: MouseEvent & {
        currentTarget: HTMLDivElement;
        target: Element;
      }
    ) {
      e.stopPropagation();
    }

    const onTransitionEnd = () => {
      if (!this.isShow()) {
        this.content = undefined;
      }
    };

    return (
      <div
        onclick={closeModal}
        class="fixed z-50 w-screen h-screen top-0 right-0 bottom-0 left-0 p-4 sm:p-10 flex items-center bg-black/30 opacity-0 transition-all duration-200"
        classList={{
          invisible: !this.isShow(),
          "opacity-100": this.isShow(),
        }}
        ontransitionend={onTransitionEnd}
      >
        <div
          onclick={stopPropagation}
          class={`max-w-full max-h-full mx-auto bg-white border rounded-xl drop-shadow-lg overflow-auto ${
            styles["custom-scrollbar"]
          }${this._config.cardClass ? ` ${this._config.cardClass}` : ""}`}
        >
          <div class="p-6 sm:p-8">{this._getContent()}</div>
        </div>
      </div>
    );
  }
}
