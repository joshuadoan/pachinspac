import useGame from "./hooks/useGame";
import "./App.css";
import { Link } from "react-router-dom";
import { isShip, isStation } from "./utils";
import {
  BuildingStorefrontIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { Meeple } from "./classes/Meeple";

function App() {
  const { state, dispatch } = useGame();
  let filtered = state.actors?.filter(function (meeple) {
    if (state.selected && meeple.id === state.selected.id) {
      return true;
    }

    if (state.selected && meeple.id !== state.selected.id) {
      return false;
    }
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
                      All
                    </Link>
                  </li>
                  <li className="gap-4">
                    <Link
                      className="btn btn-ghost uppercase text-xl"
                      to={`/${state.selected.id}`}
                      onClick={() =>
                        dispatch({
                          type: "toggle-side-bar",
                        })
                      }
                    >
                      {state.selected.name}
                    </Link>
                    <div className="badge">{state.selected.status}</div>
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
        />
        <ul className="py-4 w-80 bg-base-100 text-base-content space-y-1">
          {filtered.map((actor) => (
            <li>
              {state.selected && (
                <Link to="/" className="btn btn-link">
                  Back
                </Link>
              )}
              <Link
                className="btn btn-ghost text-lg capitalize flex flex-nowrap justify-start"
                to={`/${actor.id}`}
              >
                <Icon actor={actor} className="w-6 h-6 mr-4" />
                {actor.name}
              </Link>
              {actor.id === state.selected?.id && (
                <div className="stat bg-white bg-opacity-50 space-y-2">
                  <div className="stat-title">
                    loc °{Math.round(actor.pos.y)} °{Math.round(actor.pos.x)}
                  </div>
                  <div className="stat-value">{actor.status}</div>
                  {actor.destination && (
                    <div className="stat-desc">{actor.destination?.name}</div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

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

function Icon(props: { actor: Meeple; className?: string }) {
  return isShip(props.actor) ? (
    <RocketLaunchIcon
      style={{
        color: props.actor.color.toString(),
      }}
      className={props.className}
    />
  ) : (
    <BuildingStorefrontIcon
      style={{
        color: props.actor.color.toString(),
      }}
      className={props.className}
    />
  );
}
