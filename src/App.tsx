import Header from "./components/Header";
import useGame from "./hooks/useGame";

import "./App.css";
import SideBar from "./components/SideBar";
import { State, Event } from "./types";
import { Link } from "react-router-dom";
import { isShip, isStation } from "./utils";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

function App() {
  const { state, dispatch } = useGame();
  let filtered = state.actors?.filter(function (meeple) {
    if (state.filters.ships && isShip(meeple)) {
      return true;
    }
    if (state.filters.stations && isStation(meeple)) {
      return true;
    }
    return false;
  });

  return (
    <div className="drawer ">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={state.sidebarIsOpen}
      />
      <div className="drawer-content">
        <div className="navbar bg-base-100 fixed">
          <div className="flex-none">
            <label
              htmlFor="my-drawer"
              className="btn btn-square btn-ghost"
              onClick={() =>
                dispatch({
                  type: "toggle-side-bar",
                })
              }
            >
              <HamburgerIcon />
            </label>
          </div>
          <div className="flex-1">
            {state.selected && (
              <div className="text-sm breadcrumbs">
                <ul>
                  <li>
                    <Link className="btn btn-ghost normal-case text-xl" to="/">
                      Zoom out
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="btn btn-ghost normal-case text-xl"
                      to={`/${state.selected.id}`}
                    >
                      {state.selected.name}
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <canvas id="pepper" />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          className="drawer-overlay"
          onClick={() =>
            dispatch({
              type: "toggle-side-bar",
            })
          }
        ></label>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
          {filtered.map((actor) => (
            <li className="items-start flex">
              <Link
                className="btn btn-ghost text-xl capitalize "
                to={`/${actor.id}`}
                onClick={() =>
                  dispatch({
                    type: "toggle-side-bar",
                  })
                }
              >
                {actor.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="inline-block w-5 h-5 stroke-current"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
      ></path>
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="inline-block w-5 h-5 stroke-current"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      ></path>
    </svg>
  );
}
