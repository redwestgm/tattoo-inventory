export function Button({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={`bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 ${className}`}
    >
      {children}
    </button>
  );
}
