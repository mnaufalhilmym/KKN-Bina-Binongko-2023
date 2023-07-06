import { Match, Switch } from "solid-js";

interface Props {
  class?: string;
  type: "filled" | "outline";
}

export default function IconMenu(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      class={props.class}
    >
      <Switch>
        <Match when={props.type === "filled"}>
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="48"
            d="M88 152h336M88 256h336M88 360h336"
          />
        </Match>
        <Match when={props.type === "outline"}>
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="32"
            d="M80 160h352M80 256h352M80 352h352"
          />
        </Match>
      </Switch>
    </svg>
  );
}
