import { Icon } from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";

interface PageTitleProps {
  icon: Icon;
  title: string;
  description: string;
  style: string;
}

function PageTitle({ icon: Icon, title, description, style }: PageTitleProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={twMerge(
          "flex h-8 w-8 items-center justify-center rounded-md border-2 border-neutral-500 bg-neutral-900 text-neutral-500",
          style,
        )}
      >
        <Icon size={16} weight="bold" />
      </div>
      <div className="flex flex-col justify-center gap-1">
        <h1 className="font-semibold leading-4">{title}</h1>
        <span className="text-xs leading-3 text-neutral-400">
          {description}
        </span>
      </div>
    </div>
  );
}

export default PageTitle;
