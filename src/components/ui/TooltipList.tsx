/**
 * @fileoverview TooltipList component for displaying lists with tooltips
 * @project     Steroid Guide Site
 * @module      components/ui/TooltipList
 */

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { TooltipWrapper } from "./TooltipWrapper";

type TooltipListItem = {
  id: string | number;
  content: React.ReactNode;
  tooltip?: string;
};

type TooltipListProps = {
  items: TooltipListItem[];
  className?: string;
  itemClassName?: string;
  ordered?: boolean;
  bulletStyle?: "disc" | "circle" | "square" | "decimal" | "none";
};

const UnorderedList = forwardRef<HTMLUListElement, TooltipListProps>(
  (
    { items, className, itemClassName, bulletStyle = "disc", ...props },
    ref
  ) => {
    const renderItem = (item: TooltipListItem) => {
      const content = (
        <span className={twMerge("block", itemClassName)}>{item.content}</span>
      );

      return item.tooltip ? (
        <TooltipWrapper key={item.id} content={item.tooltip}>
          {content}
        </TooltipWrapper>
      ) : (
        <div key={item.id}>{content}</div>
      );
    };

    return (
      <ul
        ref={ref}
        className={twMerge(
          "space-y-2",
          `list-${bulletStyle}`,
          "pl-5",
          className
        )}
        {...props}
      >
        {items.map((item) => (
          <li key={item.id} className="pl-1">
            {renderItem(item)}
          </li>
        ))}
      </ul>
    );
  }
);

const OrderedList = forwardRef<HTMLOListElement, TooltipListProps>(
  ({ items, className, itemClassName, ...props }, ref) => {
    const renderItem = (item: TooltipListItem) => {
      const content = (
        <span className={twMerge("block", itemClassName)}>{item.content}</span>
      );

      return item.tooltip ? (
        <TooltipWrapper key={item.id} content={item.tooltip}>
          {content}
        </TooltipWrapper>
      ) : (
        <div key={item.id}>{content}</div>
      );
    };

    return (
      <ol
        ref={ref}
        className={twMerge("space-y-2", "list-decimal", "pl-5", className)}
        {...props}
      >
        {items.map((item) => (
          <li key={item.id} className="pl-1">
            {renderItem(item)}
          </li>
        ))}
      </ol>
    );
  }
);

const TooltipList = forwardRef<HTMLElement, TooltipListProps>((props, ref) => {
  const { ordered = false } = props;
  return ordered ? (
    <OrderedList {...props} ref={ref as React.Ref<HTMLOListElement>} />
  ) : (
    <UnorderedList {...props} ref={ref as React.Ref<HTMLUListElement>} />
  );
});

TooltipList.displayName = "TooltipList";

export type { TooltipListItem, TooltipListProps };
export { TooltipList };
