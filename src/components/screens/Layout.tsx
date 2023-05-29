import Sidebar from 'components/common/Sidebar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="mx-auto mt-8">
      <Sidebar />
      <Outlet></Outlet>
    </div>
  );
}

export default Layout;
