import Header from "./components/Header";
import { Pos } from "./components/Pos";
import useGame from "./hooks/useGame";

import { filterByState, isShip } from "./utils";

import "./App.css";
import { ShipDetails } from "./components/ShipDetails";
import { StationDetails } from "./components/StationDetails";
import { ButtonLink } from "./components/Button";
import Icon from "./components/Icon";

function App() {
  const { state, dispatch, selected } = useGame();
  let filtered = state.actors?.filter((meeple) =>
    filterByState(state.filters, meeple)
  );

  return (
    <div className="absolute h-screen overflow-hidden flex flex-col p-4 font-mono w-full">
      <Header dispatch={dispatch} state={state} />
      <main className="flex-1 overflow-hidden ">
        {selected ? (
          <div className="flex flex-col gap-4 text-white">
            <div className="py-4">
              {isShip(selected) ? (
                <ShipDetails ship={selected} />
              ) : (
                <StationDetails selected={selected} />
              )}
            </div>
          </div>
        ) : (
          <ul className="h-full overflow-auto space-y-6  max-w-md">
            {filtered.map((actor) => {
              return (
                <li key={actor.id} className="">
                  <ButtonLink to={String(actor.id)} className="capitalize">
                    <Icon
                      flavor={isShip(actor) ? "Ship" : "Station"}
                      className="h-6 w-6"
                      style={{
                        color: String(actor.color),
                      }}
                    />

                    {actor.name}
                    <Pos pos={actor.pos} />
                  </ButtonLink>
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
