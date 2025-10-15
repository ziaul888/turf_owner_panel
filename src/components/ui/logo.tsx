import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
    className?: string;
    size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
    const sizeClasses = {
        sm: "w-6 h-6",
        md: "w-70 h-8",
        lg: "w-110 h-10",
    };

    return (
        <div
            className={cn(
                "flex items-center justify-center rounded-md overflow-hidden",
                sizeClasses[size],
                className
            )}
        >
            <Image
                src="/logo.png"
                alt="Logo"
                width={size === "sm" ? 24 : size === "md" ? 32 : 100}
                height={size === "sm" ? 24 : size === "md" ? 32 : 100}
                className="object-contain"
            />
        </div>
    );
}