export default function Header({ image }) {
  return (
    <figure className="md:flex rounded-xl p-8 md:p-0">
      <img
        className="w-32 h-32 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
        src={image}
        alt=""
        width="384"
        height="512"
      />
      <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
        <blockquote>
          <p className="text-lg font-normal italic">
            “Luruskan niat, perbaiki sikap, luaskan ilmu dan manfaat”
          </p>
        </blockquote>
        <figcaption className="font-medium">
          <div className="text-cyan-600 text-3xl">Ajat Darojat</div>
          <div className="text-gray-500">
            Software Engineer & Coding Instructor
          </div>
        </figcaption>
      </div>
    </figure>
  );
}
