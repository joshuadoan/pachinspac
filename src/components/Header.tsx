import { Button, ButtonLink } from "./Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import { Event, State } from "../types";

function Header(props: { dispatch: (value: Event) => void; state: State }) {
  return (
    <header className="p-4 flex gap-4 items-center fixed">
      <Button
        onClick={() =>
          props.dispatch({
            type: "toggle-side-bar",
          })
        }
      >
        {props.state.sidebarIsOpen ? (
          <EyeIcon className="h-6 w-6" />
        ) : (
          <EyeSlashIcon className="h-6 w-6" />
        )}
      </Button>
      {props.state.selected && <ButtonLink to="/">Zoom out</ButtonLink>}
    </header>
  );
}

export default Header;
