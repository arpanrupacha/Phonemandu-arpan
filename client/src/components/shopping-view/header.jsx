import { HousePlug, LogOut, Menu, ShoppingCart, UserCog, Heart } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchFavorites } from "@/store/shop/favorite-slice/favorite-slice";
import { useToast } from "../ui/use-toast";
import ShoppingProductTile from "./product-tile";
import phonemandu from "../../assets/phonemandulogo.png";
import { Sun, Moon } from "lucide-react";

function MenuItems({ onClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);

    if (onClick) onClick();
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <span
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
        >
          {menuItem.label}
        </span>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { items: favorites } = useSelector((state) => state.favorites);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const [openWishlistSheet, setOpenWishlistSheet] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleLogout() {
    dispatch(logoutUser());
  }

  // Add to Cart handler for wishlist
  const handleAddToCart = (product) => {
    if (!user?.id) {
      toast({ title: "Please login to add to cart" });
      return;
    }
    dispatch(
      addToCart({
        userId: user.id,
        productId: product._id,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user.id));
        toast({ title: "Product is added to cart" });
      }
    });
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
      dispatch(fetchFavorites(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <div className="flex flex-row items-center gap-2 sm:gap-4">
      {/* Cart */}
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>
      {/* Wishlist */}
      <Sheet open={openWishlistSheet} onOpenChange={() => setOpenWishlistSheet(false)}>
        <Button
          onClick={() => setOpenWishlistSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <Heart className="w-6 h-6" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {favorites?.length || 0}
          </span>
          <span className="sr-only">User wishlist</span>
        </Button>
        <SheetContent className="h-[80vh] overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">Your Wishlist</h2>
          {favorites && favorites.length > 0 ? (
            <div className="grid gap-2">
              {favorites.map((product) => (
                <div
                  key={product._id}
                  onClick={() => navigate(`/shop/listing?product=${product._id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <ShoppingProductTile
                    product={product}
                    handleAddToCart={() => handleAddToCart(product)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>Your wishlist is empty.</p>
          )}
        </SheetContent>
      </Sheet>
      {/* User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName ? user.userName[0].toUpperCase() : "?"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          {user?.userName ? (
            <>
              <DropdownMenuLabel>Logged in as {user.userName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/shop/account")}>
                <UserCog className="mr-2 h-4 w-4" />
                Account
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuLabel>Not logged in</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/auth/login")}>
                <LogOut className="mr-2 h-4 w-4" />
                Login
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b-4 bg-background dark:bg-darkBackground">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 md:px-10">
        {/* Logo */}
        <Link to="/shop/home" className="flex items-center gap-2">
          <img
            src={phonemandu}
            alt="Phonemandu Logo"
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-12">
          {shoppingViewHeaderMenuItems.map((menuItem) => (
            <Link
              key={menuItem.id}
              to={menuItem.path}
              className="text-lg font-bold text-foreground dark:text-darkForeground relative group transition-all duration-300"
            >
              {menuItem.label}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-3/4 max-w-xs p-4">
              <MenuItems />
            </SheetContent>
          </Sheet>
        </div>

        {/* Right Section */}
        <div className="flex flex-row items-center gap-2 sm:gap-4">
          {/* Theme Toggle Button (optional) */}
          {/* <button
            onClick={toggleTheme}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-gray-800" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-400" />
            )}
          </button> */}

          {/* Other Header Content */}
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
