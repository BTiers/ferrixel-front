import { PropsWithChildren } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/Typography";
import { Explanation } from "@/components/utils";

export function Card({
  children,
  className,
  onClick,
  ...divProps
}: PropsWithChildren & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded border border-gray-200 bg-white p-4 shadow-sm dark:bg-gray-800 print:shadow-none",
        onClick && "cursor-pointer hover:bg-gray-50",
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      {...divProps}
    >
      {children}
    </div>
  );
}

export type StatCardProps = {
  title: React.ReactNode;
  visual?: React.ReactNode;
  stat: React.ReactNode;
  variation?: number;
  showNoVariation?: boolean;
  explanation?: React.ReactNode;
  isLoading?: boolean;
};

export function StatCard({
  title,
  visual,
  stat,
  variation,
  showNoVariation = false,
  explanation,
  isLoading,
}: StatCardProps) {
  if (isLoading) {
    <Card>
      <div className="flex items-center space-x-4">
        {visual && (
          <div className="h-12 w-12 flex-shrink-0 animate-pulse rounded-full bg-gray-100" />
        )}
        <div className="flex-1">
          <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
          <div className="h-6 w-1/3 animate-pulse rounded bg-gray-100" />
        </div>
      </div>
    </Card>;
  }

  const textColor =
    variation && variation >= 0 ? (variation === 0 ? "" : "text-emerald-500") : "text-rose-500";

  return (
    <Card>
      <div className="flex items-center space-x-4">
        {visual && (
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
            {visual}
          </div>
        )}
        <div className="flex-1">
          <dl>
            <dt className="flex items-center space-x-1">
              <Text className="truncate text-sm" intent="muted">
                {title}
              </Text>
              {explanation && <Explanation>{explanation}</Explanation>}
            </dt>
            <dd className="flex items-baseline space-x-3">
              <div className="text-2xl font-bold text-gray-900">{stat}</div>
              {variation !== undefined && (showNoVariation || variation !== 0) && (
                <div className={`flex items-center print:hidden ${textColor}`}>
                  <Text className={`text-sm font-medium ${textColor}`}>{variation}</Text>
                  {variation >= 0 ? (
                    variation === 0 ? (
                      ""
                    ) : (
                      <ArrowUpIcon className="h-3" />
                    )
                  ) : (
                    <ArrowDownIcon className="h-3" />
                  )}
                </div>
              )}
            </dd>
          </dl>
        </div>
      </div>
    </Card>
  );
}
