import { Logo } from "@/components/logo";
import { LogOut, Menu, Stethoscope, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";

const menuItems = [
  { name: "Features", href: "#link" },
  { name: "Solution", href: "#link" },
  { name: "Pricing", href: "#link" },
  { name: "About", href: "#link" },
];

export const HeroHeader = () => {
  const navigate = useNavigate();

  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const isAuthenticated = !!localStorage.getItem("accessToken");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    // call the backend here..
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    navigate("/?authMode=sign-in", { replace: true });
  };

  return (
    <header>
      <nav className={`fixed z-20 bg-white w-full px-2 ${menuState ? "" :"border-b"}`}>
        <div
          className={
            "mx-auto mt-2 max-w-8xl px-6 transition-all duration-300 lg:px-12"
            }
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            {/* Logo and Mobile Button */}
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                to="/"
                aria-label="home"
                className="flex items-center space-x-2 gap-2 text-lg"
              >
                <Stethoscope /> MEDICAL CARE
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                {menuState ? (
                  <X className="m-auto size-6 duration-200" />
                ) : (
                  <Menu className="m-auto size-6 duration-200" />
                )}
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:block">
              <ul className="flex gap-8 text-sm">
                {/* {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.href}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))} */}
              </ul>
            </div>

            {/* Buttons */}
            <div className="hidden lg:flex lg:items-center lg:gap-3">
              {isAuthenticated ? (
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut /> Logout
                </Button>
              ) : (
                <>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/?authMode=sign-in">Login</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link to="/?authMode=sign-up">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {menuState && (
            <div className="lg:hidden mt-4 w-full rounded-3xl bg-background border p-6 shadow-4xl shadow-zinc-300/20 dark:bg-dark">
              <ul className="space-y-6">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.href}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <div className="flex flex-col gap-3 mt-4">
                  {isAuthenticated ? (
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      <LogOut /> Logout
                    </Button>
                  ) : (
                    <>
                      <Button asChild variant="outline" size="sm">
                        <Link to="/?authMode=sign-in">Login</Link>
                      </Button>
                      <Button asChild size="sm">
                        <Link to="/?authMode=sign-up">Sign Up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
