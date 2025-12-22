import { ChevronDown, ChevronUp } from "lucide-react";

type ToggableHeaderProps = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
};

export function ToggableHeader({
  title,
  isOpen,
  onToggle,
}: ToggableHeaderProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between border-b-2 border-(--color-dark-green) p-3 cursor-pointer text-left"
      aria-expanded={isOpen}
    >
      <h1 className="text-3xl font-semibold text-(--color-dark-green)">
        {title}
      </h1>
      {isOpen ? (
        <ChevronUp className="text-(--color-dark-green)" />
      ) : (
        <ChevronDown className="text-(--color-dark-green)" />
      )}
    </button>
  );
}
