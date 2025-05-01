"use client";

export default function PageNavButton({
  next,
  handlePage,
  disabled,
  title
}: {
  next: boolean;
  handlePage: (next: boolean) => void;
  disabled: boolean;
  title: string
}) {
  const pageScrollButtonClasses = `flex flex-row justify-center items-center w-content h-content p-2`;
  return (
    <button
      className={pageScrollButtonClasses}
      disabled={disabled}
      onClick={() => {
        handlePage(next);
      }}
    >
      {title}
    </button>
  );
}
