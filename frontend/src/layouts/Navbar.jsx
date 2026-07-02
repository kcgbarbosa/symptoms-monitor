import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Activity, ChevronDown } from 'lucide-react';
import { DEMO_MODE } from '../config/demoConfig.js';
import { useAuthStore } from '../../store/useAuthStore.js';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { session, signOut } = useAuthStore();
  const navigate = useNavigate();

  const closeMenu = () => setIsMenuOpen(false);

  const handleSignOut = async () => {
    closeMenu();
    await signOut();
    navigate('/auth');
  };

  return (
    <nav className="bg-base-100 h-16 flex items-center px-3 border-b border-gray-300 relative">
      <Link
        to="/"
        className="flex items-center gap-1 text-xl pl-4 text-purple-600 font-bold uppercase tracking-tighter"
      >
        <Activity className="size-6 text-purple-600" />
        Symptoms Monitor
      </Link>

      <label className="ml-auto md:hidden btn btn-circle swap swap-rotate">
        <input
          type="checkbox"
          checked={isMenuOpen}
          onChange={() => setIsMenuOpen((prev) => !prev)}
        />
        <svg
          className="swap-off fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 512 512"
        >
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>
        <svg
          className="swap-on fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 512 512"
        >
          <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
        </svg>
      </label>

      <div className="hidden md:flex items-center ml-auto pr-2 gap-2">
        {DEMO_MODE && (
          <div className="inline-flex items-center rounded-full border shadow-sm px-3 py-1 uppercase tracking-widest font-bold bg-yellow-200 text-yellow-800 border-yellow-300 text-xs">
            DEMO MODE
          </div>
        )}

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center h-10 px-3 ${isActive ? 'font-bold text-purple-600' : ''}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/entries"
          className={({ isActive }) =>
            `flex items-center h-10 px-3 ${isActive ? 'font-bold text-purple-600' : ''}`
          }
        >
          Entries
        </NavLink>
        <NavLink
          to="/trends"
          className={({ isActive }) =>
            `flex items-center h-10 px-3 ${isActive ? 'font-bold text-purple-600' : ''}`
          }
        >
          Trends
        </NavLink>

        {session ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-sm flex items-center gap-1 normal-case font-normal"
            >
              <span className="max-w-[140px] truncate text-sm">
                {session.user.email}
              </span>
              <ChevronDown size={14} />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-20 w-44 p-2 shadow-md border border-gray-200 mt-1"
            >
              <li>
                <button onClick={handleSignOut} className="text-sm">
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink
            to="/auth"
            className={({ isActive }) =>
              `flex items-center h-10 px-3 ${isActive ? 'font-bold text-purple-600' : ''}`
            }
          >
            Log in
          </NavLink>
        )}
      </div>

      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-10 md:hidden"
            onClick={closeMenu}
          />
          <div className="absolute top-16 right-2 bg-base-100 border border-gray-300 shadow-md rounded-box md:hidden z-20">
            <div className="flex flex-col py-2 min-w-[10rem]">
              {DEMO_MODE && (
                <div className="mx-4 mb-2 text-center rounded-full border px-3 py-1 uppercase tracking-widest font-bold bg-yellow-200 text-yellow-800 border-yellow-300 text-xs">
                  Demo Mode
                </div>
              )}

              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-3 text-sm flex items-center ${isActive ? 'font-bold text-purple-600' : ''}`
                }
                onClick={closeMenu}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/entries"
                className={({ isActive }) =>
                  `px-4 py-3 text-sm flex items-center ${isActive ? 'font-bold text-purple-600' : ''}`
                }
                onClick={closeMenu}
              >
                Entries
              </NavLink>
              <NavLink
                to="/trends"
                className={({ isActive }) =>
                  `px-4 py-3 text-sm flex items-center ${isActive ? 'font-bold text-purple-600' : ''}`
                }
                onClick={closeMenu}
              >
                Trends
              </NavLink>

              <div className="border-t border-gray-200 mt-1 pt-1">
                {session ? (
                  <>
                    <p className="px-4 py-2 text-xs text-base-content/50 truncate">
                      {session.user.email}
                    </p>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-3 text-sm text-error"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <NavLink
                    to="/auth"
                    className={({ isActive }) =>
                      `px-4 py-3 text-sm flex items-center ${isActive ? 'font-bold text-purple-600' : ''}`
                    }
                    onClick={closeMenu}
                  >
                    Log in
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
