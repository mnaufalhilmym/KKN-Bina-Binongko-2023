import { JSXElement } from "solid-js";

interface Props {
  title1: string;
  title2: string;
  children: JSXElement;
}

export default function HomeSection(props: Props) {
  return (
    <>
      <div>
        <div class="w-fit mx-auto">
          <span class="font-tahu text-2xl text-sea_serpent">
            {props.title1}
          </span>
        </div>
        <div class="w-fit mx-auto">
          <span class="font-poppins font-bold text-3xl">{props.title2}</span>
        </div>
      </div>
      <div class="mt-6">
        {props.children}
      </div>
    </>
  );
}
