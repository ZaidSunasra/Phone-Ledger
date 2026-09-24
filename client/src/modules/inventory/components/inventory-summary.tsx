import { useFetchSummary } from "@/api/inventory/inventory.queries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Plus } from "lucide-react"

const InventorySummary = () => {
  const { data, isPending, isError } = useFetchSummary()

  if (isPending) return <>Loading..</>
  if (isError) return <>Error...</>

  return (
    <section
      className="grid gap-4 md:grid-cols-3"
      aria-label="Inventory summary"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Items in inventory
          </CardTitle>
          <Package className="text-muted-foreground" aria-hidden="true" />
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold tracking-tight">
            {data.summary.totalInventory}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Currently in stock
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total inventory value
          </CardTitle>
          <span className="text-lg font-medium text-muted-foreground">$</span>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold tracking-tight">
            {data.summary.inventoryCost}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Based on purchase cost
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Added this month
          </CardTitle>
          <Plus className="text-muted-foreground" aria-hidden="true" />
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold tracking-tight">
            {data.summary.addedThisMonth}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {data.summary.addedPercentageChange}
          </p>
        </CardContent>
      </Card>
    </section>
  )
}

export default InventorySummary
