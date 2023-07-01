export default function LoadingLogo() {
  return (
    <div class="fixed top-0 right-0 bottom-0 left-0 w-screen h-screen flex items-center justify-center">
      <div>
        <img
          src="/src/assets/logo.png"
          alt="Logo Bina Binongko"
          loading="lazy"
          class="w-16 h-16"
        />
        <span>Loading...</span>
      </div>
    </div>
  );
}
