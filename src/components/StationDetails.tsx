import { Link } from "react-router-dom";
import { Station } from "../engine/Station";
import { ButtonLink } from "./Button";
import Icon from "./Icon";
import { Pos } from "./Pos";

export function StationDetails(props: { station: Station }) {
  const visitors = Object.values(props.station.visitors);
  return (
    <div>
      <div className="flex gap-4 mb-4">
        <Icon
          flavor="Station"
          className="h-6 w-6"
          style={{
            color: String(props.station.color),
          }}
        />
        <span className="capitalize">{props.station.name}</span>
        <Pos pos={props.station.pos} />
      </div>
      <div>
        {visitors.length ? (
          <dl className="flex flex-col space-y-4">
            <dt>Visitors: </dt>
            {visitors.map(
              (ship) =>
                ship && (
                  <dd className="flex  items-center gap-2" key={ship.id}>
                    <Icon
                      flavor="Ship"
                      style={{
                        color: String(ship.color),
                      }}
                    />
                    <ButtonLink
                      to={`/${String(ship.id)}`}
                      className="capitalize"
                    >
                      {ship.name}
                    </ButtonLink>
                  </dd>
                )
            )}
          </dl>
        ) : null}
      </div>
    </div>
  );
}