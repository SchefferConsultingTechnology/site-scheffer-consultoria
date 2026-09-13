import { useMemo, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { COUNTRY_CODES, countryName, flagFromIso2 } from "@/lib/country-codes";
import type { Locale } from "@/content/locale";

export function CountryCodeSelect({
  value,
  onChange,
  locale,
  triggerAriaLabel,
  searchPlaceholder,
  noResultsLabel,
}: {
  value: string;
  onChange: (iso2: string) => void;
  locale: Locale;
  triggerAriaLabel: string;
  searchPlaceholder: string;
  noResultsLabel: string;
}) {
  const [open, setOpen] = useState(false);

  const options = useMemo(() => {
    return COUNTRY_CODES.map((country) => ({
      ...country,
      name: countryName(country.iso2, locale),
      flag: flagFromIso2(country.iso2),
    })).sort((a, b) => a.name.localeCompare(b.name, locale));
  }, [locale]);

  const selected = options.find((option) => option.iso2 === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={triggerAriaLabel}
          className="h-10 shrink-0 justify-between gap-1.5 px-3 font-normal"
        >
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true">{selected?.flag}</span>
            <span>+{selected?.dialCode}</span>
          </span>
          <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{noResultsLabel}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.iso2}
                  value={`${option.name} ${option.iso2} ${option.dialCode}`}
                  onSelect={() => {
                    onChange(option.iso2);
                    setOpen(false);
                  }}
                >
                  <span aria-hidden="true">{option.flag}</span>
                  <span className="flex-1 truncate">{option.name}</span>
                  <span className="text-muted-foreground">+{option.dialCode}</span>
                  <Check
                    className={cn("h-4 w-4", option.iso2 === value ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
