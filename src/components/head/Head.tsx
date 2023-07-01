import { MetaProvider, Title } from "@solidjs/meta";
import SiteHead from "../../state/siteHead";

export default function Head() {
  return (
    <MetaProvider>
      <Title>{SiteHead.title()}</Title>
    </MetaProvider>
  );
}
