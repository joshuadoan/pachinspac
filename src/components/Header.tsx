import cx from "classnames";
import { Button, ButtonLink } from "./Button";
import { PaperAirplaneIcon, WrenchIcon } from "@heroicons/react/24/solid";

import { Event, State } from "../types";

function Header(props: { dispatch: (value: Event) => void; state: State }) {
  return (
    <header className="mb-4 flex gap-4 items-center ">
      <ButtonLink to="/">Home</ButtonLink>
      <Button
        onClick={() =>
          props.dispatch({
            type: "toggle-paused",
          })
        }
        className="capitalize"
      >
        {props.state.isPaused ? "play" : "pause"}
      </Button>

      <Button
        onClick={() =>
          props.dispatch({
            type: "update-filters",
            payload: {
              filters: {
                ships: !props.state.filters.ships,
              },
            },
          })
        }
        className={cx("flex items-center", {
          "opacity-50": !props.state.filters.ships,
        })}
      >
        <PaperAirplaneIcon className="h-4 w-4" />
      </Button>
      <Button
        onClick={() =>
          props.dispatch({
            type: "update-filters",
            payload: {
              filters: {
                stations: !props.state.filters.stations,
              },
            },
          })
        }
        className={cx("flex items-center", {
          "opacity-50": !props.state.filters.stations,
        })}
      >
        <WrenchIcon className="h-4 w-4" />
      </Button>
    </header>
  );
}

export default Header;
