import { A } from "@solidjs/router";

interface Props {
  href: string;
}

export default function ViewMore(props: Props) {
  return (
    <>
      <div class="absolute z-10 bottom-4 w-full h-2/5 bg-gradient-to-b from-transparent to-white">
        <div class="absolute bottom-0 w-full">
          <A
            href={props.href}
            class="block w-fit mx-auto font-bold font-futura_pt"
          >
            Lihat selengkapnya
          </A>
        </div>
      </div>
      <div class="absolute -bottom-2 w-full h-6 bg-white" />
    </>
  );
}
