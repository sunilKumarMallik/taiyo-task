import Layout from 'components/screens/Layout';
import Sidebar from 'components/common/Sidebar';
import Maps from 'components/common/Maps';
import 'leaflet/dist/leaflet.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Contacts from 'components/screens/Contacts';
function App() {
  // react v6 router
  const router = createBrowserRouter([
    //creating a browserRouter children element
    {
      path: '/',
      element: <Layout></Layout>,
      //layout for intial entry point to the app
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
