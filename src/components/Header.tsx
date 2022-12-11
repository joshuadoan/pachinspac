import { Button, ButtonLink } from "./Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import { Event, State } from "../types";

function Header(props: { dispatch: (value: Event) => void; state: State }) {
  return (
    <header className="mb-4 flex gap-4 items-center">
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
      {props.state.selected && (
        <ButtonLink to="/">Back to all ships</ButtonLink>
      )}
    </header>
  );
}

export default Header;
