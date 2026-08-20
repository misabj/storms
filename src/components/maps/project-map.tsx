type ProjectMapProps = {
  address: string;
  className?: string;
  dark?: boolean;
};

export function ProjectMap({ address, className = "", dark = false }: ProjectMapProps) {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const query = encodeURIComponent(address);
  const src = key
    ? `https://www.google.com/maps/embed/v1/place?key=${key}&q=${query}`
    : `https://www.google.com/maps?q=${query}&output=embed`;

  return (
    <div
      className={`relative w-full min-w-0 overflow-hidden ${dark ? "bg-[#11110f]" : "bg-[#dcd9d1]"} ${className}`}
    >
      <iframe
        title={`Mapa — ${address}`}
        src={src}
        className={`absolute inset-0 block h-full w-full border-0 ${dark ? "grayscale invert-[.92] sepia-[.18] hue-rotate-[165deg] brightness-[.5] contrast-[1.35] saturate-[.45]" : ""}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
