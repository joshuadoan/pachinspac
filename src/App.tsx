import useGame from "./hooks/useGame";
import "./App.css";
import { Link } from "react-router-dom";
import { isShip, isStation } from "./utils";
import { Meeple } from "./classes/Meeple";
import { Color } from "excalibur";
import Blockies from "react-blockies";
import cx from "classnames";

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
    <div className="drawer">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={state.sidebarIsOpen}
      />
      <div className="drawer-content">
        <div className="navbar bg-base-100 fixed z-10">
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
                  <li>
                    <Link
                      className="btn btn-ghost uppercase text-xl flex gap-4 mr-4"
                      to={`/${state.selected.id}`}
                      onClick={() =>
                        dispatch({
                          type: "toggle-side-bar",
                        })
                      }
                    >
                      <Icon actor={state.selected} className="w-6 h-6 mr-4" />
                      {state.selected.name}
                    </Link>
                    <div className="badge">
                      {state.selected.attributes.status}
                    </div>
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
        <ul className="py-4 w-80 bg-base-100 text-base-content space-y-2">
          {filtered.map((actor) => (
            <li>
              {state.selected && (
                <Link to="/" className="btn btn-link">
                  All
                </Link>
              )}
              <Link
                className="btn btn-ghost text-lg capitalize flex flex-nowrap justify-start gap-3 text-left mb-4"
                to={`/${actor.id}`}
              >
                <Icon actor={actor} className="w-6 h-6 mr-4" />
                {actor.name}
              </Link>
              {actor.id === state.selected?.id && (
                <>
                  <div className="stat bg-white bg-opacity-50 space-y-2 mb-4">
                    <div className="stat-title">
                      loc °{Math.round(actor.pos.y)} °{Math.round(actor.pos.x)}
                    </div>
                    <div className="stat-value">{actor.attributes.status}</div>
                    {actor.attributes.destination && (
                      <div className="stat-desc">
                        <Link to={`/${actor.attributes.destination.id}`}>
                          {actor.attributes.destination?.name}
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className="px-4">
                    {Object.values(actor.attributes.visitors).map((actor) => {
                      return (
                        actor && (
                          <div
                            className={cx("chat", {
                              "chat-end": actor.id % 2 === 0,
                              "chat-start": actor.id % 2 !== 0,
                            })}
                          >
                            <div className="chat-image avatar">
                              <Link to={`/${actor.id}`}>
                                <Icon actor={actor} className="w-6 h-6 mr-4" />
                              </Link>
                            </div>
                            <div className="chat-bubble first-letter:capitalize">
                              {actor.attributes.chat.length &&
                                actor.attributes.chat[0]}
                            </div>
                          </div>
                        )
                      );
                    })}
                  </div>
                </>
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
  return (
    <Avatar
      color={props.actor.color}
      name={props.actor.name}
      className="mask mask-circle"
    />
  );
}

function Avatar({
  size,
  color,
  name,
  className,
}: {
  color: Color;
  name: string;
  size?: number;
  seed?: string;
  className?: string;
}) {
  return (
    <Blockies
      className={className}
      seed={`${color.toString()}${name}`}
      size={size || 8}
      color={color.toRGBA()}
    />
  );
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a: any[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
