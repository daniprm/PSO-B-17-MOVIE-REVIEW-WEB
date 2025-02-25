"use client";
import { createContext, useState, useContext } from "react";

interface FilterContextType {
  selectedGenres: string[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  return (
    <FilterContext.Provider value={{ selectedGenres, setSelectedGenres }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (!context)
    throw new Error(
      "useFilterContext must be used within a FilterProviderWrapper"
    );
  return context;
}
