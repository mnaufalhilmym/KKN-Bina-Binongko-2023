interface Props {
  imgUrl: string;
}

export default function HomeGalleryCard(props: Props) {
  return (
    <img
      src={import.meta.env.VITE_BACKEND_ENDPOINT + props.imgUrl}
      loading="lazy"
      class="h-72 w-72 object-cover rounded-xl shadow-md"
    />
  );
}
