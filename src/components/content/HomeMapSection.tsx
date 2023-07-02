import HomeSection from "./HomeSection";

interface Props {
  title1: string;
  title2: string;
}

export default function HomeMapSection(props: Props) {
  return (
    <HomeSection title1={props.title1} title2={props.title2}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63489.41796527804!2d123.98780035228842!3d-5.9825345495118185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2da7a44f395eed35%3A0x304f91e288dbdafb!2sKec.%20Togo%20Binongko%2C%20Kabupaten%20Wakatobi%2C%20Sulawesi%20Tenggara!5e0!3m2!1sid!2sid!4v1688289029410!5m2!1sid!2sid"
        width="100%"
        height="450"
        style="border:0;"
        allowfullscreen={false}
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      />
    </HomeSection>
  );
}
