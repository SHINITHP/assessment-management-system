import AppHeader from "./AppHeader";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <AppHeader />
      <main className="pt-20">
        <Outlet />
      </main>
      {/* footer */}
    </>
  );
};

export default AppLayout;
