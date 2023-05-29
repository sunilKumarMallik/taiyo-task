import '../../index.css';
import { useState } from 'react';
import { Transition } from '@tailwindui/react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ zIndex: 999999 }} id="Sidebar">
      {!isOpen ? (
        <button onClick={() => setIsOpen(!isOpen)}>
          <svg
            className="fixed  z-30 flex items-center cursor-pointer right-10 top-6"
            fill="#2563EB"
            viewBox="0 0 100 80"
            width="40"
            height="40"
          >
            <rect width="100" height="10"></rect>
            <rect y="30" width="100" height="10"></rect>
            <rect y="60" width="100" height="10"></rect>
          </svg>
        </button>
      ) : (
        <div>
          <button
            className="text-xl text-white fixed top-4 right-4 z-10"
            onClick={() => setIsOpen(!isOpen)}
            style={{ zIndex: 9999999 }}
          >
            x
          </button>
          <Transition
            show={isOpen}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              style={{ zIndex: 999999 }}
              className={`top-0 right-0 w-[20vw] bg-blue-600  p-10 pl-20 text-white fixed h-full `}
            >
              <ul className="space-y-10 font-medium xl:mr-9 SideBarMain">
                <li>
                  <button>
                    <Link to={'/map'} className="mt-3 text-xl">
                      {' '}
                      Chart & Maps
                    </Link>
                  </button>
                </li>
                <li>
                  <button>
                    {' '}
                    <Link to={'/'} className="mt-3 text-xl">
                      {' '}
                      contact
                    </Link>
                  </button>
                </li>
              </ul>
            </div>
          </Transition>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
