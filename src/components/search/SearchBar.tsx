import { debounce } from "@solid-primitives/scheduled";

interface Props {
  placeholder: string;
  value?: string;
  executeSearch: (value?: string) => void;
}

export default function SearchBar(props: Props) {
  let searchRef: HTMLInputElement | undefined;

  const debounceSearchValue = debounce((value: string) => {
    props.executeSearch(value);
  }, 500);

  function onInput(
    e: Event & {
      currentTarget: HTMLInputElement;
      target: Element;
    }
  ) {
    debounceSearchValue(e.currentTarget.value);
  }

  return (
    <div class="2xl:w-1/4 xl:w-1/3 lg:w-1/2 w-4/5 h-12 mx-auto">
      <input
        ref={searchRef}
        type="text"
        placeholder={props.placeholder}
        oninput={onInput}
        value={props.value ?? ""}
        class="w-full h-full px-6 bg-bone/40 rounded-full focus:outline-none focus:ring-2 focus:ring-gargoyle_gas font-futura_pt"
      />
    </div>
  );
}
