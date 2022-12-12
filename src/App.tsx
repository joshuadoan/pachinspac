import Header from "./components/Header";
import { Pos } from "./components/Pos";
import useGame from "./hooks/useGame";

import { filterByState, isShip, isStation } from "./utils";

import "./App.css";
import { ShipDetails } from "./components/ShipDetails";
import { StationDetails } from "./components/StationDetails";
import { ButtonLink } from "./components/Button";
import Icon from "./components/Icon";
import classNames from "classnames";
import Filters from "./components/Filters";

function App() {
  const { state, dispatch } = useGame();
  let filtered = state.actors?.filter((meeple) =>
    filterByState(state.filters, meeple)
  );

  return (
    <div className="p-4 text-white">
      <Header dispatch={dispatch} state={state} />
      <main
        className={classNames(
          "p-4 fixed w-fit flex-1 h-screen transform top-16 left-4 ease-in-out transition-all duration-300 bg-sky-500 bg-opacity-20 max-w-lg rounded-md m",
          {
            "translate-x-0 ": state.sidebarIsOpen,
            "-translate-x-full": !state.sidebarIsOpen,
          }
        )}
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
          <ul className="h-full overflow-auto  space-y-4">
            {filtered.map((actor) => {
              return (
                <li key={actor.id} className="flex gap-2">
                  <Icon
                    flavor={isShip(actor) ? "Ship" : "Station"}
                    className="h-6 w-6"
                    style={{
                      color: String(actor.color),
                    }}
                  />
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
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
      </main>
    </div>
  );
}

export default App;
