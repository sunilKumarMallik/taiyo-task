import Sidebar from 'components/common/Sidebar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="mx-auto mt-8">
      {/* sidebar is common  */}
      <Sidebar />
      {/* outlate for rendering the router */}
      <Outlet></Outlet>
    </div>
  );
}

export default Layout;
