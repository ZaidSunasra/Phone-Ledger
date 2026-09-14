import { FetchShops } from "@/api/shops/shop.queries"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useShop } from "@/store/shop.store"
import { Building2, Check, ChevronRight, Plus } from "lucide-react"
import { NavLink, useNavigate } from "react-router"

const SelectShop = () => {
  const navigate = useNavigate()
  const { data: shops, isError, isPending } = FetchShops()

  const selectedShop = useShop((state) => state.selectedShop)

  const setSelectedShop = useShop((state) => state.setSelectedShop)

  const handleSelectShop = (shop: any) => {
    setSelectedShop(shop.id)
    navigate("/dashboard")
  }

  if (isError || isPending) {
    return <>Loading....</>
  }
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-muted/30 px-6 py-12">
      <div className="w-full max-w-3xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Select your shop
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Choose an shop to continue to your workspace.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {shops?.shops.map((shop) => {
            const isSelected = selectedShop === shop.id
            return (
              <Button
                key={shop.id}
                type="button"
                variant="ghost"
                onClick={() => handleSelectShop(shop)}
                className={`group relative flex h-auto min-h-20 w-full items-center justify-start gap-4 rounded-xl border bg-background px-4 py-4 text-left shadow-sm transition-all duration-200 hover:bg-background hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary ${
                  isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20 hover:bg-primary/5"
                    : "hover:-translate-y-0.5 hover:border-primary/40"
                } `}
              >
                <div
                  className={`flex size-11 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                  } `}
                >
                  <Building2 className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {shop.name}
                  </p>

                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Shop</span>

                    <span className="text-muted-foreground/50">•</span>

                    <Badge
                      variant={isSelected ? "default" : "secondary"}
                      className="px-2 py-0 text-[11px]"
                    >
                      {shop.role}
                    </Badge>
                  </div>
                </div>
                {isSelected ? (
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-4" />
                  </div>
                ) : (
                  <ChevronRight className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-foreground" />
                )}
              </Button>
            )
          })}
          <div>
            <NavLink
              to="/add-shop"
              className="group flex h-full min-h-20 w-full items-center gap-4 rounded-xl border border-dashed bg-background px-4 py-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                <Plus className="size-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">
                  Add Shop
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add up a new shop
                </p>
              </div>
              <ChevronRight className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-foreground" />
            </NavLink>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          You can switch shops later from your workspace.
        </p>
      </div>
    </main>
  )
}

export default SelectShop
