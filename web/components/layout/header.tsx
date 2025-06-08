import React from "react";
export default function Header() {
    return (
        <header className="w-full bg-background text-foreground border-b border-border p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Left: Logo */}
                <div className="text-xl font-bold">
                    <img src="/logo.png" alt="logo" className="h-10" />
                </div>

                {/* Center: Search bar */}
                <div className="flex-1 mx-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-4 py-2 border border-input rounded-md bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Right: Optional placeholder for now */}
                <div className="w-12" />
            </div>
        </header>
    );
}
