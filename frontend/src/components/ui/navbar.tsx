import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Train } from "lucide-react";
import { Button } from "@/components/ui/button";
import algorailLogo from "@/assets/algorail-logo.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "#problem", label: "Problem" },
    { href: "#features", label: "Features" },
    { href: "#algorithms", label: "Algorithms" },
    { href: "#how-it-works", label: "How It Works" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Train className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">AlgoRail</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            <Link to="/dashboard">
              <Button variant="default" className="bg-gradient-primary hover:opacity-90">
                Launch Dashboard
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-border"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 px-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Link to="/dashboard" className="px-2">
                <Button variant="default" className="w-full bg-gradient-primary hover:opacity-90">
                  Launch Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};