import React from "react";
// import logo from "./logo.png"; // Uncomment and adjust path as needed

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-8 px-4 text-foreground">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:justify-between space-y-6 md:space-y-0">

        {/* Left: Logo */}
        <div className="flex items-center space-x-3 md:flex-1 md:justify-start">
          <img src="./logo.png" alt="Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold">MyCompany</span>
        </div>

        {/* Center: Newsletter subscription */}
        <form className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md md:flex-1 md:justify-center">
          <input
            type="email"
            placeholder="Your email"
            required
            className="flex-1 px-4 py-2 rounded-md border border-input bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
          >
            Subscribe
          </button>
        </form>

        {/* Right: About link */}
        <div className="md:flex-1 md:justify-end md:flex">
          <a href="/about" className="text-primary hover:underline">
            About Us
          </a>
        </div>
      </div>
    </footer>
  );
}
