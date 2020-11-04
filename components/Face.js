export default function Face() {
  return (
    <>
      <div class="md:flex bg-white rounded-lg my-6">
        <img
          class="h-40 w-40 md:h-40 md:w-40 rounded-full mx-auto md:mx-0 md:mr-6"
          src="https://cms.ajatdarojat45.id/photos/1/IMG_20200305_180224_451.jpg"
        />
        <div class="text-center md:text-left">
          <h2 class="text-2xl md:text-4xl mx-auto">
            Halo, saya Ajat Darojat 👋🏼
          </h2>
          <div class="text-gray-600 md:text-xl text-sm">
            Manusia yang ingin berguna dan bermanfaat.
          </div>
          <div class="text-gray-600 md:text-xl text-sm underline mb-2 italic">
            "Luruskan niat, perbaiki sikap, luaskan ilmu dan manfaat"
          </div>
          <div>
            <a
              href="#"
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-1"
            >
              /Linkedin
            </a>
            <a
              href="#"
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-1"
            >
              /Youtube
            </a>
            <a
              href="#"
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-1"
            >
              /Instagram
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
