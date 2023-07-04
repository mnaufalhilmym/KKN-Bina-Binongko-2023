import { Show } from "solid-js";
import IconLocation from "../icons/Location";
import PhotoSlider from "../slider/PhotoSlider";
import { A } from "@solidjs/router";

export default function ModalContent(props: ModalContentProps) {
  return (
    <>
      <div>
        <span class="block font-poppins font-bold text-3xl text-center">
          {props.title}
        </span>
      </div>
      <Show when={props.subtitle}>
        <div class="flex justify-center items-center gap-x-1">
          <span>
            <IconLocation class="w-5 h-5 text-sea_serpent" />
          </span>
          <span class="block font-futura_pt text-center">{props.subtitle}</span>
        </div>
      </Show>
      <div class="mt-8 flex gap-x-6">
        <div class="flex-1">
          <PhotoSlider imgUrls={props.imgUrls} />
        </div>
        <div class="flex-1 flex flex-col">
          <Show when={props.contact}>
            <A
              href={props.contact!}
              target="_blank"
              class="mb-6 p-4 flex items-center gap-x-2 bg-gargoyle_gas/20 font-futura_pt shadow-md rounded-3xl"
            >
              <img
                src={
                  import.meta.env.VITE_BASE_URL +
                  "/src/assets/logo/whatsapp.webp"
                }
                alt="WhatsApp logo"
                class="w-12 h-12"
              />
              <span>Informasi dan Pemesanan ({props.contactName})</span>
            </A>
          </Show>
          <div class="flex-1 p-4 bg-gargoyle_gas/20 font-futura_pt shadow-md rounded-3xl">
            <div>
              <span>Deskripsi:</span>
            </div>
            <div>
              <span>{props.description}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
