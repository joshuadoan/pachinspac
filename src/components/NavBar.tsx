import { Link } from "react-router-dom";
import { Event, State } from "../types";
import { HamburgerIcon } from "./HamburgerIcon";
import { Avatar } from "./Avatar";

export function NavBar(props: {
  state: State;
  dispatch: (event: Event) => void;
}) {
  const { state, dispatch } = props;
  return (
    <div className="navbar bg-base-100 z-10 fixed">
      <div className="flex-none">
        <label
          htmlFor="side-bar"
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
                  <Avatar
                    color={state.selected.color}
                    name={state.selected.name}
                    className="mask mask-circle w-6 h-6 "
                  />
                  {state.selected.name}
                </Link>
                <div className="badge">{state.selected.attributes.status}</div>
              </li>
            </ul>
          </div>
        )}
      </div>
      <select data-choose-theme className="select select-ghost max-w-xs">
        <option value="cyberpunk">Default</option>
        <option value="dark">Dark</option>
        <option value="autumn">Autumn</option>
        <option value="business">Business</option>
        <option value="acid">Acid</option>
        <option value="lemonade">Lemonade</option>
        <option value="coffee">Coffee</option>
        <option value="winter">Winter</option>
      </select>
    </div>
  );
}
