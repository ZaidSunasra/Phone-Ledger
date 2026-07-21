import AppLayout from "@/layouts/app-layout"

export default function DashboardPage() {
    return (
        <AppLayout title="Dashboard">
            {Array.from({ length: 24 }).map((_, index) => (
                <div
                    key={index}
                    className="aspect-video h-12 w-full rounded-lg bg-muted/50"
                />
            ))}
        </AppLayout>
    )
}
