export function HomeHero() {
  return (
    <section aria-labelledby="home-title" className="mb-14 text-center sm:mb-20 lg:mb-24">
      <h1
        id="home-title"
        lang="en"
        className="text-5xl leading-none font-bold tracking-tight sm:text-7xl"
      >
        JianXun<span className="text-primary dark:text-[#a3c4b3]">.</span>
      </h1>

      <div
        aria-hidden="true"
        className="home-hero-stage relative isolate mt-4 overflow-hidden sm:-mt-2 lg:-mt-5"
      >
        <div className="home-hero-ring z-10 mx-auto aspect-[2/1] w-[92%] max-w-[760px] xl:max-w-[min(62%,1160px)]" />
      </div>
    </section>
  );
}
