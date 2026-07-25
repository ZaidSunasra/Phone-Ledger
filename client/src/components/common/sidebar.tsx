import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, useSidebar, } from "@/components/ui/sidebar"
import { useAuth } from "@/store/auth.store";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, } from "@/components/ui/avatar";
import { getInitials } from "@/utils/get-initials";
import { useOrganization } from "@/store/organization.store";
import { navData } from "@/config/navigation";
import { DropdownMenu, DropdownMenuContent,  DropdownMenuItem,  DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, ChevronsUpDown } from "lucide-react"
import { useLogout } from "@/api/auth/auth.mutation";

const AppSidebar = () => {

    const user = useAuth((state) => state.user);
    const logout = useLogout();
    const { selectedOrganization, setSelectedOrganization } = useOrganization();
    const { isMobile } = useSidebar();

    const handleLogout = () => {
        logout.mutate()
    }

    const organizationOptions =
        user?.organizations.map(org => ({
            label: org.name,
            value: org.id
        })
        )

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <h1 className="group-data-[collapsible=icon]:hidden">Phone Ledger</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                    <Select
                        items={organizationOptions}
                        value={selectedOrganization ?? ""}
                        onValueChange={(value) => setSelectedOrganization(value!)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select shop" />
                        </SelectTrigger>
                        <SelectContent alignItemWithTrigger={true}>
                            <SelectGroup>
                                <SelectLabel>Your Shops</SelectLabel>
                                {user?.organizations.map((org) => (
                                    <SelectItem key={org.id} value={org.id}>
                                        {org.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </SidebarGroup>
                <SidebarGroup>
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
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger render={
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarFallback className="rounded-lg">{user?.name && getInitials(user?.name)}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">{user?.name}</span>
                                        <span className="truncate text-xs">{user?.email}</span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            }>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                side={isMobile ? "bottom" : "right"}
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

export default AppSidebar;
