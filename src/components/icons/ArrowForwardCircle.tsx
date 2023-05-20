import { Match, Switch } from "solid-js";

interface Props {
  class?: string;
  type: "filled" | "outline";
}

export default function IconArrowForwardCircle(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      class={props.class}
    >
      <Switch>
        <Match when={props.type === "filled"}>
          <path d="M464 256c0-114.87-93.13-208-208-208S48 141.13 48 256s93.13 208 208 208 208-93.13 208-208zm-212.65 91.36a16 16 0 01-.09-22.63L303.58 272H170a16 16 0 010-32h133.58l-52.32-52.73A16 16 0 11274 164.73l79.39 80a16 16 0 010 22.54l-79.39 80a16 16 0 01-22.65.09z" />
        </Match>
        <Match when={props.type === "outline"}>
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M262.62 336L342 256l-79.38-80M330.97 256H170"
          />
          <path
            d="M256 448c106 0 192-86 192-192S362 64 256 64 64 150 64 256s86 192 192 192z"
            fill="none"
            stroke="currentColor"
            stroke-miterlimit="10"
            stroke-width="32"
          />
        </Match>
      </Switch>
    </svg>
  );
}
