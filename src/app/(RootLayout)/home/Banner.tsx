import Image from "next/image";

const Banner = () => {
  return (
    <section className="mb-12">
      <div className="rounded-2xl grid grid-cols-12 gap-2 relative bg-primary/80">
        <div className="px-2 mt-16 mb-8 md:mb-16 md:mx-12 md:ml-6 col-span-8 md:col-span-7 lg:col-span-6 lg:ml-0 lg:mx-0 flex flex-col justify-center items-end text-center">
          <h1 className="mb-6 mx-8 md:mx-16 max-w-2xl text-4xl sm:text-4xl font-extrabold leading-none tracking-tight xl:text-5xl text-secondary">
            Full customizable page just for you!
          </h1>
          <p className="mb-6 mx-2 max-w-2xl font-light text-violet-200 text-lg sm:text-[1.15rem] md:text-2xl lg:mb-8">
            You can match your background with the colors your like, choose custom badges and show your favorite songs.
          </p>
        </div>
        <div className="col-span-4 md:col-span-5 lg:col-span-6 rounded-2xl relative">
          <Image
            fill
            quality={90}
            src="/home3.jpg"
            className="home-image-fade object-cover rounded-r-2xl"
            alt="home image example"
            sizes="(max-width: 768px) 600px, (max-width: 1200px) 800px, 1200px"
          />
        </div>
      </div>
    </section>
  );
};
export default Banner;
