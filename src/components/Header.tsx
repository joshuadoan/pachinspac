import { useParams } from "react-router-dom";
import { Button, ButtonLink } from "./Button";
import { Event, State } from "../types";

function Header(props: { dispatch: (value: Event) => void; state: State }) {
  let { id } = useParams();

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
