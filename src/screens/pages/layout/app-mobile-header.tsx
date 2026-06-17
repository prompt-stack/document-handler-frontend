import { SidebarTrigger, useSidebar } from "@/shadui/components/ui/sidebar"
import { cn } from "@/shadui/lib/utils"
import React from "react"

export default function AppMobileHeader() {
    const { isMobile, state } = useSidebar()

    React.useEffect(() => {
        console.log("isMobile: ", isMobile);
        
    }, [isMobile, state])
    return (
        <div className={cn(isMobile ? "block" : "hidden", "h-12 w-full bg-gradient-to-t from-slate-900/10")} >
            <div className="relative min-w-[250px] flex justify-center items-center w-full h-full flex items-center gap-4">
                <div className="absolute left-4 w-full h-full flex items-center gap-4">
                    <SidebarTrigger />
                </div>
                <span className="w-full text-center font-bold whitespace-nowrap text-lg tracking-wide leading-tight">
                    Document Handler
                </span>
            </div>
        </div>
    )
}