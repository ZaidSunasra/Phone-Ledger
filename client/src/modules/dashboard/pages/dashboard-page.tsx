import { StoreIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, } from "@/components/ui/empty"
import AppLayout from "@/layouts/app-layout"
import { useAuth } from "@/store/auth.store"

export default function DashboardPage() {

    const { user } = useAuth()

    return (
        <AppLayout title="Dashboard">
            {
                user?.organizations.length == 0 ?
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <StoreIcon />
                            </EmptyMedia>
                            <EmptyTitle>No Shops Yet</EmptyTitle>
                            <EmptyDescription>
                                You haven't created any shops yet. Create your first shop to start managing your inventory, sales, and customers.
                            </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent className="flex-row justify-center gap-2">
                            <Button>Create Shop</Button>
                        </EmptyContent>
                    </Empty>
                    :
                    Array.from({ length: 24 }).map((_, index) => (
                        <div
                            key={index}
                            className="aspect-video h-12 w-full rounded-lg bg-muted/50"
                        />
                    ))
            }

        </AppLayout>
    )
}
