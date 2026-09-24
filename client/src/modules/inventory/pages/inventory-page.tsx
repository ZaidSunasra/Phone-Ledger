import { useFetchDevices } from "@/api/inventory/inventory.queries"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AppLayout from "@/layouts/app-layout"
import { Plus, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTableParams } from "@/hooks/use-table-params"
import TableToolbar from "@/components/common/table-toolbar"
import { useDebounce } from "@/hooks/use-debounce"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import TablePagination from "@/components/common/table-pagination"
import InventorySummary from "../components/inventory-summary"

type InventorySortBy = "name" | "buyPrice" | "buyDate"

const InventoryPage = () => {
  const table = useTableParams<InventorySortBy>({
    defaultSortBy: "buyDate",
    defaultSortOrder: "desc",
    defaultLimit: 50,
  })

  const debouncedSearch = useDebounce(table.params.search, 500)
  const { data, isPending, isError, error } = useFetchDevices({
    ...table.params,
    search: debouncedSearch,
  })

  if (isPending) {
    return <>Loading...</>
  }

  if (isError) {
    return <>{error.message}</>
  }

  return (
    <AppLayout title="Inventory">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Inventory overview
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Keep track of every device across your shop.
          </p>
        </div>
        <Button className="flex items-center justify-center rounded-md px-4 py-2">
          <Plus />
          Add Device
        </Button>
      </div>
      <InventorySummary />
      <Card className="overflow-hidden">
        <CardHeader className="gap-4 border-b">
          <div>
            <CardTitle>All devices</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Search and manage your current inventory.
            </p>
          </div>
          <TableToolbar
            params={table.params}
            sortOptions={[
              { label: "Name", value: "name" },
              { label: "Buy price", value: "buyPrice" },
              { label: "Buy date", value: "buyDate" },
            ]}
            onSearchChange={table.setSearch}
            onSortByChange={table.setSortBy}
            onSortOrderChange={table.setSortOrder}
            onLimitChange={table.setLimit}
            onClear={table.clearFilters}
          />
        </CardHeader>
        <CardContent>
          {data.devices.length === 0 ? (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Smartphone />
                </EmptyMedia>

                <EmptyTitle>No devices found</EmptyTitle>

                <EmptyDescription>
                  There are no devices matching your current filters.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <div className="text-sm text-muted-foreground">
              {data.pagination.total} rows found
            </div>
          )}
        </CardContent>
        <CardFooter>
          <TablePagination
            page={table.params.page}
            totalPages={data.pagination.totalPages}
            onPageChange={table.setPage}
          />
        </CardFooter>
      </Card>
    </AppLayout>
  )
}

export default InventoryPage
