import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Boxes, ChartLine, IndianRupee, LayoutDashboard, Settings } from "lucide-react"

const navData = [
    {
        icon: LayoutDashboard,
        title: "Dashboard",
        url: "/dashboard"
    },
    {
        icon: IndianRupee,
        title: "Sales",
        url: "/dashboard"
    },
    {
        icon: Boxes,
        title: "Inventory",
        url: "/dashboard"
    },
    {
        icon: ChartLine,
        title: "Analytics",
        url: "/dashboard"
    },
    {
        icon: Settings,
        title: "Settings",
        url: "/dashboard"
    },

]

const AppSidebar = () => {

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <h1 className="group-data-[collapsible=icon]:hidden">Phone Ledger</h1>
            </SidebarHeader>
            <SidebarContent>
                {navData.map((item) => (
                    <SidebarMenu key={item.title}>
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton>
                                    {<item.icon />}
                                    <a href={item.url}>{item.title}</a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                    </SidebarMenu>

                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}

export default AppSidebar;
