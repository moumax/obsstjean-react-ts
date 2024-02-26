function CardAbout({ data }) {
  return (
    <>
      <div className="flex w-full flex-col items-center">
        <h3 className="m-[2vw] mb-[7vh] text-2xl text-yellow-300">
          {data.title}
        </h3>
        <img
          className="h-60 w-full rounded-2xl"
          src={data.image}
          alt={data.alt}
        />
      </div>
      <p className="pt-20 text-center text-white opacity-40">{data.textFr}</p>
    </>
  );
}

export default CardAbout;
