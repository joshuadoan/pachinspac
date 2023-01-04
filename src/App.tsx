import useGame from "./hooks/useGame";
import { Link } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Visitors } from "./components/Visitors";
import { Avatar } from "./components/Avatar";
import {
  BuildingStorefrontIcon,
  RocketLaunchIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline";
import { themeChange } from "theme-change";

import "./App.css";
import { useEffect } from "react";

function App() {
  const { state, dispatch } = useGame();

  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  return (
    <div className="drawer">
      <input
        id="side-bar"
        type="checkbox"
        className="drawer-toggle"
        checked={state.sidebarIsOpen}
        onChange={() => {}}
      />
      <div className="drawer-content">
        <canvas id="pepper" />
        <NavBar state={state} dispatch={dispatch} />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="side-bar"
          className="drawer-overlay"
          style={{
            opacity: 0,
          }}
          onClick={() =>
            dispatch({
              type: "toggle-side-bar",
            })
          }
        />
        <div className=" w-80 bg-base-100 text-base-content border-r border-base-200 mt-16 ">
          {!state.selected && (
            <form className="text-sm flex gap-4  px-4 py-3">
              {["trader", "station", "repair"].map((filter) => (
                <label key={filter} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked={state.filters[filter]}
                    className="checkbox checkbox-sm"
                    onClick={() =>
                      dispatch({
                        type: "update-filters",
                        payload: {
                          filters: {
                            [filter]: !state.filters[filter],
                          },
                        },
                      })
                    }
                  />
                  {
                    {
                      trader: <RocketLaunchIcon className="w-6 h-6" />,
                      station: <BuildingStorefrontIcon className="w-6 h-6" />,
                      repair: <WrenchIcon className="w-6 h-6" />,
                    }[filter]
                  }
                </label>
              ))}
            </form>
          )}
          <ul className=" space-y-2">
            {state.actors
              .filter((meeple) => {
                if (!state.selected) {
                  return state.filters[meeple.role];
                }

                if (state.selected && meeple.id === state.selected.id) {
                  return state.selected;
                }

                return false;
              })
              .map((actor) => (
                <li key={actor.id}>
                  {state.selected && (
                    <Link to="/" className="btn btn-link">
                      back
                    </Link>
                  )}
                  {!state.selected && (
                    <Link
                      className="btn btn-ghost text-lg capitalize flex flex-nowrap justify-start gap-3 text-left h-auto p-2"
                      to={`/${actor.id}`}
                    >
                      <Avatar
                        color={actor.color}
                        name={actor.name}
                        className="mask mask-circle w-6 h-6 "
                      />
                      <div>
                        <div className="text-sm font-light">
                          <span className="badge badge-primary badge-outline">
                            {actor.role}
                          </span>
                        </div>
                        {actor.name}
                        <div className="text-sm font-light">
                          <span className="badge">{actor.state}</span> °
                          {Math.round(actor.pos.y)} °{Math.round(actor.pos.x)}
                        </div>
                      </div>
                    </Link>
                  )}
                  {actor.id === state.selected?.id && (
                    <div>
                      <div className="stat bg-white bg-opacity-50 space-y-2 mb-4">
                        <div className="stat-title">
                          loc °{Math.round(actor.pos.y)} °
                          {Math.round(actor.pos.x)}
                        </div>
                        <div className="stat-value">{actor.state}</div>
                        {actor.destination && (
                          <div className="stat-desc">
                            <Link to={`/${actor.destination.id}`}>
                              {actor.destination?.name}
                            </Link>
                          </div>
                        )}
                      </div>
                      <div className="tabs">
                        <a className="tab tab-lifted">visitors</a>
                        <a className="tab tab-lifted tab-active">log</a>
                      </div>
                      <Visitors
                        visitors={Object.values(actor.visitors).filter(
                          notEmpty
                        )}
                      />
                      <ul className="flex flex-col space-y-4 px-4 mt-4">
                        {state.selected.log.map((l) => (
                          <li className="flex  gap-2">
                            <div className="badge badge-secondary">
                              {l.date.getMilliseconds()}
                            </div>
                            {l.message}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}
