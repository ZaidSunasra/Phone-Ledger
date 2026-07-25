import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, } from "@/components/ui/sidebar"
import { useAuth } from "@/store/auth.store";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Avatar, AvatarFallback, } from "../ui/avatar";
import { getInitials } from "@/utils/get-initials";
import { useOrganization } from "@/store/organization.store";
import { navData } from "@/config/navigation";


const AppSidebar = () => {

    const user = useAuth((state) => state.user);
    const { selectedOrganization, setSelectedOrganization } = useOrganization()

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
                        <SidebarMenuButton>
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarFallback className="rounded-lg">{user?.name && getInitials(user?.name)}</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{user?.name}</span>
                                <span className="truncate text-xs">{user?.email}</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

export default AppSidebar;
