import { Match, Switch } from "solid-js";

interface Props {
  class?: string;
  type: "filled" | "outline";
  direction: "forward" | "back";
}

export default function IconArrowCircle(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      class={props.class}
    >
      <Switch>
        <Match when={props.type === "filled"}>
          <Switch>
            <Match when={props.direction === "forward"}>
              <path
                fill="currentColor"
                d="M464 256c0-114.87-93.13-208-208-208S48 141.13 48 256s93.13 208 208 208 208-93.13 208-208zm-212.65 91.36a16 16 0 01-.09-22.63L303.58 272H170a16 16 0 010-32h133.58l-52.32-52.73A16 16 0 11274 164.73l79.39 80a16 16 0 010 22.54l-79.39 80a16 16 0 01-22.65.09z"
              />
            </Match>
            <Match when={props.direction === "back"}>
              <path
                fill="currentColor"
                d="M48 256c0 114.87 93.13 208 208 208s208-93.13 208-208S370.87 48 256 48 48 141.13 48 256zm212.65-91.36a16 16 0 01.09 22.63L208.42 240H342a16 16 0 010 32H208.42l52.32 52.73A16 16 0 11238 347.27l-79.39-80a16 16 0 010-22.54l79.39-80a16 16 0 0122.65-.09z"
              />
            </Match>
          </Switch>
        </Match>
        <Match when={props.type === "outline"}>
          <Switch>
            <Match when={props.direction === "forward"}>
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
            <Match when={props.direction === "back"}>
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
                d="M249.38 336L170 256l79.38-80M181.03 256H342"
              />
              <path
                d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                fill="none"
                stroke="currentColor"
                stroke-miterlimit="10"
                stroke-width="32"
              />
            </Match>
          </Switch>
        </Match>
      </Switch>
    </svg>
  );
}
