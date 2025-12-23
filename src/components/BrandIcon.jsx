export default function BrandIcon({ size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2s3 3.5 3 6a3 3 0 1 1-6 0c0-2.5 3-6 3-6z" />
      <path d="M9 14h6" />
      <path d="M10 18h4" />
    </svg>
  );
}
