import useGame from "./hooks/useGame";
import { Link } from "react-router-dom";
import { isShip, isStation } from "./utils";
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
        <ul className="py-4 w-80 bg-base-100 text-base-content ">
          {state.actors
            .filter((meeple) => {
              if (!state.selected) {
                return (
                  (state.filters.ships && isShip(meeple)) ||
                  (state.filters.stations && isStation(meeple))
                );
              }

              if (state.selected && meeple.id === state.selected.id) {
                return state.selected;
              }

              return false;
            })
            .map((actor) => (
              <li key={actor.id} className="">
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
                    {actor.name}
                    <div className="text-sm font-light">
                      <span className="badge">{actor.attributes.status}</span> °
                      {Math.round(actor.pos.y)} °{Math.round(actor.pos.x)}
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
  );
}

export default App;
