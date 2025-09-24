import AppHeader from "./AppHeader";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <AppHeader />
      <main>
        <Outlet />
      </main>
      {/* footer */}
    </>
  );
};

export default AppLayout;
