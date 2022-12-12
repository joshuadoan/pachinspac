import { Pos } from "./Pos";
import { filterByState, isShip, isStation } from "../utils";
import { ShipDetails } from "./ShipDetails";
import { StationDetails } from "./StationDetails";
import { ButtonLink } from "./Button";
import Icon from "./Icon";
import classNames from "classnames";
import Filters from "./Filters";
import { State, Event } from "../types";

function SideBar(props: {
  dispatch: (value: Event) => void;
  state: State;
  className?: string;
}) {
  const { dispatch, state } = props;
  let filtered = props.state.actors?.filter((meeple) =>
    filterByState(state.filters, meeple)
  );
  return (
    <div
      className={classNames(
        "p-4 transform ease-in-out transition-all duration-300 bg-blue-400 bg-opacity-10",
        {
          "translate-x-0": props.state.sidebarIsOpen,
          "-translate-x-full": !state.sidebarIsOpen,
        },
        props.className
      )}
      style={{
        minWidth: "24rem",
      }}
    >
      {!state.selected && <Filters dispatch={dispatch} state={state} />}
      {state.selected ? (
        <div className="flex flex-col gap-4 text-white ">
          {isShip(state.selected) ? (
            <ShipDetails ship={state.selected} />
          ) : isStation(state.selected) ? (
            <StationDetails station={state.selected} />
          ) : null}
        </div>
      ) : (
        <ul className="h-full overflow-auto space-y-4">
          {filtered.map((actor) => {
            return (
              <li key={actor.id} className="flex gap-2 items-start">
                <Icon
                  flavor={isShip(actor) ? "Ship" : "Station"}
                  className="h-6 w-6"
                  style={{
                    color: String(actor.color),
                  }}
                />
                <div className="flex flex-col gap-2">
                  <div className="flex flex-nowrap gap-2">
                    <ButtonLink to={String(actor.id)} className="capitalize">
                      {actor.name}
                    </ButtonLink>
                    {isShip(actor) && <span>{actor.status}</span>}
                    {isShip(actor) && actor.visiting && (
                      <ButtonLink to={"/" + actor.visiting.id}>
                        <Icon
                          flavor="Station"
                          style={{
                            color: String(actor.visiting.color),
                          }}
                        />
                      </ButtonLink>
                    )}
                    {isShip(actor) && !actor.visiting && (
                      <Pos pos={actor.pos} />
                    )}
                  </div>
                  {isStation(actor) && (
                    <div className="flex gap-2">
                      {Object.values(actor.visitors)
                        .filter((v) => !!v)
                        .map((ship, i) => (
                          <ButtonLink
                            to={"/" + ship?.id}
                            key={"icon-" + ship?.id + i}
                          >
                            <Icon
                              flavor="Ship"
                              style={{
                                color: String(ship?.color),
                              }}
                            />
                          </ButtonLink>
                        ))}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default SideBar;
