const PersonFull = ({ size, className }: IconProps) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="#000000" stroke="#000000" strokeWidth="16" viewBox="0 0 256 256">
      {/* Head */}
      <circle cx="128" cy="64" r="32" />
      {/* Body */}
      <path d="M128 128c-24 0-48 16-48 48v32h96v-32c0-32-24-48-48-48z" />
    </svg>
  );
};

export default PersonFull;
