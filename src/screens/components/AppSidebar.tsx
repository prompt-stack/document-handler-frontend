import { authService } from "@/service/authService";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
  useSidebar,
} from "../../shadui/components/ui/sidebar"
import { LayoutDashboard, Users, Settings, LogOut, File, ChevronDown } from "lucide-react"; // Crisp vectors to replace emojis
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shadui/components/ui/collapsible";

const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "documents", 
      label: "Documents", 
      icon: File,
      children: [
        { id: "all-documents", label: "All Documents", icon: File },
        { id: "my-documents", label: "My Documents", icon: File },
        { id: "pdf", label: "PDF", icon: File },
        { id: "docs", label: "Docs", icon: File },
        { id: "excel", label: "Excel", icon: File }
      ]
    },
    { id: "users",     label: "Users",     icon: Users },
    { id: "settings",  label: "Settings",  icon: Settings },
];

interface AppSidebarProps {
  isAuthenticated: boolean | null;
}

export function AppSidebar({ isAuthenticated }: AppSidebarProps) {
  // 1. Pull active navigation item handlers from your old state
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isDocumentSubmenuOpen, setIsDocumentSubmenuOpen] = useState(false);
    const { toggleSidebar, setOpen, open } = useSidebar()
  
  // 3. Port your existing async authentication handler perfectly
  const handleLogout = async () => {
    const logoutUrl = await authService.logout();
    if (logoutUrl) {
      window.location.href = logoutUrl;
    } else {
      console.error("Logout URL not found");
    }
  };


  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-slate-800">
        <SidebarHeader className="flex w-full items-center justify-center border-b border-slate-800/40">
            <SidebarMenu>
                <SidebarMenuItem>
                {/* Static Container: Non-clickable, clean layout alignment */}
                <div className="w-full flex items-center gap-3 select-none text-slate-200">
                    <img 
                        src="/logo.png" // Starts directly from the root of the public folder
                        alt="Document Handler Logo" 
                        className="h-7.5 w-7.5 rounded-sm object-contain" 
                        onClick={() => {
                            toggleSidebar()
                        }}
                    />
                    {/* The textual title / label */}
                    <div className="w-full flex flex-row items-center justify-between group-data-[state=collapsed]:hidden">
                        <span className="font-bold whitespace-nowrap text-lg tracking-wide leading-tight">
                            Document Handler
                        </span>
                        <SidebarTrigger />
                    </div>
                </div>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        {/* 2. MIDDLE CONTENT SECTION (Map navigation elements seamlessly) */}
        <SidebarContent className="">
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu className="gap-y-1">
                        {navItems.map((item) => {
                            const IconComponent = item.icon;
                            const isActive = activeItem === item.id;
                            const hasChildren = !!item.children?.length;

                            if (hasChildren) {
                                const isHasActiveChild = item.children!.some(child => child.id === activeItem);
                                return (
                                <Collapsible key={item.id} open={isDocumentSubmenuOpen} className="group/collapsible">
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                onClick={() => (setOpen(true), open ? setIsDocumentSubmenuOpen(!isDocumentSubmenuOpen) : setIsDocumentSubmenuOpen(true))}
                                                isActive={isActive}
                                                className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-md transition-colors font-medium hover:bg-[#454a6b]!
                                                    ${isHasActiveChild
                                                    ? "bg-[#454a6b]! hover:text-slate-400! text-slate-300 font-semibold"
                                                    : "text-slate-400 hover:text-slate-200!"
                                                    }`}
                                            >
                                                <IconComponent className={`h-5 w-5 ${isHasActiveChild ? "text-blue-400" : "text-slate-400"}`} />
                                                <span className="text-sm flex-1">{item.label}</span>
                                                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>

                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item?.children?.map((child) => (
                                                    <SidebarMenuSubItem key={child.id}>
                                                        <SidebarMenuSubButton
                                                            isActive={activeItem === child.id}
                                                            onClick={() => setActiveItem(child.id)}
                                                            className={`transition-colors hover:bg-slate-800/50
                                                            ${activeItem === child.id
                                                                ? "bg-[#2e3248]! text-slate-300! font-semibold"
                                                                : "text-slate-400 hover:text-slate-500"
                                                            }`}
                                                        >
                                                            <span className="text-sm">{child.label}</span>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                                );
                            }
                        
                            
                            return (
                                <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton
                                        isActive={isActive}
                                        onClick={() => setActiveItem(item.id)}
                                        className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-md transition-colors font-medium
                                            ${isActive 
                                            ? "bg-[#454a6b]! text-slate-300! font-semibold" 
                                            : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                                            }`}
                                    >
                                        <IconComponent className={`h-5 w-5 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
                                        <span className="text-sm">{item.label}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>

        {/* 3. FOOTER SECTION (Context-aware action components) */}
        {isAuthenticated && (
            <SidebarFooter className="p-4 border-t border-slate-800/60">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton 
                            onClick={handleLogout}
                            className="w-full justify-center lg:justify-between bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2.5 font-semibold transition-all group-data-[collapsible=icon]:p-2"
                        >
                            <div className="flex items-center gap-3">
                            <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs select-none">
                                U
                            </div>
                            <span className="text-sm truncate group-data-[state=collapsed]:hidden">
                                Logout
                            </span>
                            </div>
                            <LogOut className="h-4 w-4 hidden lg:block group-data-[state=collapsed]:hidden" />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        )}
    </Sidebar>
  );
}