import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
  UserIcon,
  LogOut, // <-- Add this!
} from "lucide-react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/store/auth-slice";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
  {
    id: "users",
    label: "Users",
    path: "/admin/users",
    icon: <UserIcon />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
    // Optionally navigate to login or home page
    navigate("/auth/login");
  }

  return (
    <Fragment>
      {/* Drawer for mobile */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 flex flex-col h-full">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 flex flex-col justify-between">
              <MenuItems setOpen={setOpen} />
              <div className="mb-4">
                <div
                  onClick={handleLogout}
                  className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <LogOut />
                  <span>Logout</span>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      {/* Fixed sidebar for desktop */}
      <aside
        className="hidden lg:flex flex-col border-r bg-background p-6"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "16rem",
          zIndex: 50,
          background: "var(--background)",
        }}
      >
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <div className="flex-1 flex flex-col justify-between mt-8">
          <MenuItems />
          <div className="mb-4">
            <div
              onClick={handleLogout}
              className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <LogOut />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
