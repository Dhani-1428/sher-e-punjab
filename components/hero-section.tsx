export function HeroSection() {
  return (
    <section className="relative flex justify-center overflow-hidden bg-transparent" data-scroll-animate>
      <video
        className="block h-auto w-auto max-h-[calc(100vh-5rem)] max-w-full object-contain"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/videos/Step inside for a taste of India!.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  )
}
