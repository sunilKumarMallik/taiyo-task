import Layout from 'components/screens/Layout';
import Sidebar from 'components/common/Sidebar';
import Maps from 'components/common/Maps';
import 'leaflet/dist/leaflet.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Contacts from 'components/screens/Contacts';
import LineGraph from 'components/screens/LineGraph';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout></Layout>,
      children: [
        {
          path: '/',
          element: <Contacts />,
        },
        {
          path: '/map',
          element: <Maps />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
