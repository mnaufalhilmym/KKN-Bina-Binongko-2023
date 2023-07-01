interface Props {
  class?: string;
}

export default function LoadingSkeleton(props: Props) {
  return <div class={`animate-pulse bg-bone ${props.class}`} />;
}
