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
      className="w-full flex items-center justify-between border-b-2 p-3 cursor-pointer text-left"
      aria-expanded={isOpen}
    >
      <h1 className="text-3xl font-semibold text-(--color-beige)">{title}</h1>
      {isOpen ? <ChevronUp /> : <ChevronDown />}
    </button>
  );
}
