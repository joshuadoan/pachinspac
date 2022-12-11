import cx from "classnames";
import { Button } from "./Button";
import { Event, State } from "../types";

function Filters(props: { dispatch: (value: Event) => void; state: State }) {
  return (
    <section className="mb-4 flex gap-4 items-center text-white">
      Filters:
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
        Ships
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
        Stations
      </Button>
    </section>
  );
}

export default Filters;
