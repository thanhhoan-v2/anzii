"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Return a placeholder with similar dimensions to avoid layout shift
        return (
            <Button variant="outline" size="icon" disabled>
                <Sun className="w-[1.2rem] h-[1.2rem]" />
            </Button>
        );
    }

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
            {theme === "dark" ? (
                <Sun className="w-[1.2rem] h-[1.2rem]" />
            ) : (
                <Moon className="w-[1.2rem] h-[1.2rem]" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
} 