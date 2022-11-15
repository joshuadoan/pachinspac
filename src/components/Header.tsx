import { useParams } from "react-router-dom";
import { Button } from "./Button";
import { ChevronLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";

import { Event, State } from "../types";

function Header(props: { dispatch: (value: Event) => void; state: State }) {
  return (
    <header className="mb-4 flex gap-4">
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
    </header>
  );
}

export default Header;
