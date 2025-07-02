export class FilterItemDto {
  id: number;
  name: string;
}

export class FilterGroupDto {
  name: string;
  selectedFilters: FilterItemDto[];
  operator: FilterItemDto[];
}

export class FiltersRequestDto {
  filters: FilterGroupDto[];
  order: 'ASC' | 'DESC';
}
