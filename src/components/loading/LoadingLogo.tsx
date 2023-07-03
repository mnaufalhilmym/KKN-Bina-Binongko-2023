export default function LoadingLogo() {
  return (
    <div class="fixed top-0 right-0 bottom-0 left-0 w-screen h-screen flex items-center justify-center">
      <div>
        <img
          src={
            import.meta.env.VITE_BASE_URL +
            "/src/assets/logo/bina-binongko.webp"
          }
          alt="Logo Bina Binongko"
          loading="lazy"
          class="w-16 h-16"
        />
        <span>Loading...</span>
      </div>
    </div>
  );
}
