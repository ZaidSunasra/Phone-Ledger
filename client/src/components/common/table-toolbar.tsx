import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type {
  SortOption,
  SortOrder,
  TableParams,
} from "@/hooks/use-table-params"

type TableToolbarProps<TSort extends string> = {
  params: TableParams<TSort>

  sortOptions: SortOption<TSort>[]
  pageSizeOptions?: number[]

  searchPlaceholder?: string

  onSearchChange: (value: string) => void
  onSortByChange: (value: TSort) => void
  onSortOrderChange: (value: SortOrder) => void
  onLimitChange: (value: number) => void
  onClear: () => void
}

const TableToolbar = <TSort extends string>({
  params,
  sortOptions,
  pageSizeOptions = [25, 50, 100],
  searchPlaceholder = "Search...",
  onSearchChange,
  onSortByChange,
  onSortOrderChange,
  onLimitChange,
  onClear,
}: TableToolbarProps<TSort>) => {
  return (
    <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-end">
      <div className="flex-1">
        <Input
          value={params.search}
          onChange={(event) => {
            onSearchChange(event.target.value)
          }}
          placeholder={searchPlaceholder}
        />
      </div>

      <div className="flex flex-wrap items-end gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-muted-foreground">
            Select row
          </span>
          <Select
            value={String(params.limit)}
            onValueChange={(value) => {
              onLimitChange(Number(value))
            }}
          >
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size} rows
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-muted-foreground">
            Sort by
          </span>

          <Select
            value={params.sortBy}
            onValueChange={(value) => {
              onSortByChange(value as TSort)
            }}
          >
            <SelectTrigger className="w-36">
              <SelectValue>
                {
                  sortOptions.find((option) => option.value === params.sortBy)
                    ?.label
                }
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-muted-foreground">
            Order by
          </span>

          <Select
            value={params.sortOrder}
            onValueChange={(value) => {
              if (value === "asc" || value === "desc") {
                onSortOrderChange(value)
              }
            }}
          >
            <SelectTrigger className="w-32">
              <SelectValue>
                {params.sortOrder === "asc" ? "Ascending" : "Descending"}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="desc">Descending</SelectItem>
              <SelectItem value="asc">Ascending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="button" variant="outline" onClick={onClear}>
          Clear
        </Button>
      </div>
    </div>
  )
}

export default TableToolbar
