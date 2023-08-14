import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

type EmptyStateProps = React.HTMLAttributes<HTMLDivElement> & {
  icon: React.ReactNode;
  title: React.ReactNode;
  whatToDo: React.ReactNode;
  action?: React.ReactNode;
};

export function EmptyState({
  icon,
  title,
  whatToDo,
  action,
  className,
  ...divProps
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col justify-center items-center text-center py-10", className)} {...divProps}>
      <div className="flex justify-center">{icon}</div>
      <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{whatToDo}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function SearchEmptyState() {
  return (
    <EmptyState
      icon={<MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />}
      title="Aucun résultat trouvé"
      whatToDo="Essayez de modifier votre recherche."
    />
  );
}
