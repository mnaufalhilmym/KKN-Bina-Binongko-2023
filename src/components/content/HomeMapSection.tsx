import Card from "../card/MapCard";
import HomeSection from "./HomeSection";

interface Props {
  title1: string;
  title2: string;
}

export default function HomeMapSection(props: Props) {
  return (
    <HomeSection title1={props.title1} title2={props.title2}>
      <Card />
    </HomeSection>
  );
}
