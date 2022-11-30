import { ButtonLink } from "./Button";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Meeple } from "../engine/Meeple";
import { isShip } from "../utils";
import { Link } from "react-router-dom";
import { Station } from "../engine/Station";
import Spinner from "./Spinner";
import { Ship } from "../engine/Ship";

function Destination(props: { destination: Station | null }) {
  if (!props.destination) {
    return (
      <span className="flex gap-4 items-center">
        ...plotting destination
        <Spinner />
      </span>
    );
  }

  return (
    <dl>
      <dt>Destination</dt>
      <dd>
        Name:{" "}
        <Link to={"/" + String(props.destination?.id)} className="capitalize">
          {props.destination?.name}
        </Link>
      </dd>
      <dd>
        Coords: {props.destination?.pos.y}° {props.destination?.pos.x}°
      </dd>
    </dl>
  );
}

function ShipDetails(props: { ship: Ship }) {
  const { ship } = props;
  const destination = ship.destination;
  const hangingOut =
    destination &&
    ship.pos.x + ship.pos.y === destination?.pos.x + destination?.pos.y;
  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        {ship.icon}
        <span className="capitalize"> {ship.name}</span>
        <span>{Math.floor(ship.pos.y)}°</span>
        <span>{Math.floor(ship.pos.x)}°</span>
      </div>

      <div>
        {hangingOut ? (
          "Hanging out at " + destination.name
        ) : (
          <Destination destination={ship.destination} />
        )}
      </div>
    </div>
  );
}

function Selection(props: { selected: Meeple }) {
  // const hangingOut = props.selected.pos.x + props.selected.pos.y === props.selected.des
  return (
    <div className="flex flex-col gap-4 text-white">
      <div className="py-4">
        {isShip(props.selected) ? (
          <ShipDetails ship={props.selected} />
        ) : (
          <>
            {props.selected.icon}
            {props.selected.name}
            <span>{Math.floor(props.selected.pos.y)}°</span>
            <span>{Math.floor(props.selected.pos.x)}°</span>
          </>
        )}
      </div>
    </div>
  );
}

export default Selection;
