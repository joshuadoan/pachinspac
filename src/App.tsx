import useGame from "./hooks/useGame";
import { Link } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Details } from "./components/Details";
import { Avatar } from "./components/Avatar";
import "./App.css";

function App() {
  const { state, dispatch } = useGame();

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
        <div className=" w-80 bg-base-100 text-base-content shadow-md">
          {!state.selected && (
            <form className="text-sm flex gap-4 bg-white px-4 py-1">
              {["Trader", "Station", "Taxi"].map((filter) => (
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
                  {filter}
                </label>
              ))}
            </form>
          )}
          <ul className=" space-y-2">
            {state.actors
              .filter((meeple) => {
                if (!state.selected && meeple.attributes) {
                  return state.filters[meeple.attributes.role];
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
                          {actor.attributes.role}
                        </span>
                      </div>
                      {actor.name}
                      <div className="text-sm font-light">
                        <span className="badge">{actor.attributes.status}</span>{" "}
                        °{Math.round(actor.pos.y)} °{Math.round(actor.pos.x)}
                      </div>
                    </div>
                  </Link>

                  {actor.id === state.selected?.id && (
                    <div>
                      <div className="stat bg-white bg-opacity-50 space-y-2 mb-4">
                        <div className="stat-title">
                          loc °{Math.round(actor.pos.y)} °
                          {Math.round(actor.pos.x)}
                        </div>
                        <div className="stat-value">
                          {actor.attributes.status}
                        </div>
                        {actor.attributes.destination && (
                          <div className="stat-desc">
                            <Link to={`/${actor.attributes.destination.id}`}>
                              {actor.attributes.destination?.name}
                            </Link>
                          </div>
                        )}
                      </div>
                      <Details actor={actor} />
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
