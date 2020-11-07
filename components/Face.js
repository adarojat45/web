export default function Face({ image }) {
  return (
    <>
      <div className="md:flex rounded-lg p-5 shadow-lg mb-4">
        <img
          className="h-40 w-40 md:h-40 md:w-40 rounded-full mx-auto md:mx-0 md:mr-6"
          src={image}
        />
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-4xl mx-auto m-0">
            Halo, saya Ajat Darojat 👋🏼
          </h2>
          <div className="md:text-xl text-sm">
            Manusia yang ingin berguna dan bermanfaat.
          </div>
          <div className=" md:text-xl text-sm underline mb-2 italic">
            "Luruskan niat, perbaiki sikap, luaskan ilmu dan manfaat"
          </div>
          <div>
            <a
              target="_blank"
              href="https://linkedin.com/in/ajatdarojat45"
              className="inline-block py-1 text-base mr-2"
            >
              /Linkedin
            </a>
            <a
              target="_blank"
              href="https://youtube.com/ajatdarojat45"
              className="inline-block py-1 text-base mr-2"
            >
              /Youtube
            </a>
            <a
              target="_blank"
              href="https://insragram.com/ajatdarojat45"
              className="inline-block py-1 text-base mr-2"
            >
              /Instagram
            </a>
            <a
              target="_blank"
              href="https://twitter.com/ajatdarojat45"
              className="inline-block py-1 text-base mr-2"
            >
              /Twitter
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
