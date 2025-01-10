/**
 * @fileoverview CompoundMetadata component for displaying compound metadata
 * @project     Steroid Guide Site
 * @module      components/ui/CompoundMetadata
 */

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { IconWithLabel } from "./IconWithLabel";
import { TooltipWrapper } from "./TooltipWrapper";
import {
  BeakerIcon,
  ClockIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

type CompoundMetadataProps = {
  type: string;
  schedule?: string;
  halfLife?: string;
  className?: string;
  tooltip?: string;
};

const CompoundMetadata = forwardRef<HTMLDivElement, CompoundMetadataProps>(
  ({ type, schedule, halfLife, className, tooltip, ...props }, ref) => {
    const content = (
      <div
        ref={ref}
        className={twMerge(
          "flex flex-wrap items-center gap-4 p-4 bg-white rounded-lg shadow dark:bg-gray-800",
          className
        )}
        {...props}
      >
        <IconWithLabel
          icon={BeakerIcon}
          label={type}
          iconColor="primary"
          className="min-w-[120px]"
        />
        {schedule && (
          <TooltipWrapper content="Administration schedule">
            <IconWithLabel
              icon={CalendarIcon}
              label={schedule}
              iconColor="default"
              className="min-w-[120px]"
            />
          </TooltipWrapper>
        )}
        {halfLife && (
          <TooltipWrapper content="Time taken for compound concentration to reduce by half">
            <IconWithLabel
              icon={ClockIcon}
              label={halfLife}
              iconColor="default"
              className="min-w-[120px]"
            />
          </TooltipWrapper>
        )}
      </div>
    );

    return tooltip ? (
      <TooltipWrapper content={tooltip}>{content}</TooltipWrapper>
    ) : (
      content
    );
  }
);

CompoundMetadata.displayName = "CompoundMetadata";

export type { CompoundMetadataProps };
export { CompoundMetadata };
