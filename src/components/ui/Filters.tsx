import { Filter } from "react-feather";

import { Button } from "./Button";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

function GroupFilter() {
    
}

export function Filters() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 w-4 h-4 stroke-1" />
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" alignOffset={-9} className="p-0 min-w-[32rem]">
        <div className="p-4">pouet pouet</div>
        <div className="flex px-4 py-3 justify-end gap-2 border-t border-gray-200">
          <Button variant="outline" size="small" className="bg-white">
            Annuler
          </Button>
          <Button size="small">Enregistrer</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
