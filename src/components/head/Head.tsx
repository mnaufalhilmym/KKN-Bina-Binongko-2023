import { MetaProvider, Title } from "@solidjs/meta";
import { Show } from "solid-js";
import SiteInfo from "../../data/siteInfo";

interface Props {
  title?: string;
}

export default function Head(props: Props) {
  return (
    <MetaProvider>
      <Show when={props.title} fallback={<Title>{SiteInfo.title}</Title>}>
        <Title>
          {props.title} | {SiteInfo.title}
        </Title>
      </Show>
    </MetaProvider>
  );
}
