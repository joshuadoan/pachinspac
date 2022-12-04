import { BuildingStorefrontIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { Ship } from "../engine/Ship";
import { Station } from "../engine/Station";
import Icon from "./Icon";
import Spinner from "./Spinner";

export function Activity(props: { destination: Station | null; ship: Ship }) {
  if (!props.destination) {
    return (
      <div className="flex gap-4 items-center">
        ...plotting destination
        <Spinner />
      </div>
    );
  }

  if (props.destination?.visitors[props.ship.id]) {
    return (
      <div className="flex gap-2">
        Hanging out at
        <Icon
          flavor="Station"
          style={{
            color: String(props.destination.color),
          }}
        />
        {props.destination?.name}
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      Flying to{" "}
      <Icon
        className="h-6 w-6"
        style={{
          color: String(props.destination.color),
        }}
        flavor={"Station"}
      />
      <Link to={"/" + String(props.destination?.id)} className="capitalize">
        {props.destination?.name}
      </Link>{" "}
      Coords: {props.destination?.pos.y}° {props.destination?.pos.x}°
    </div>
  );
}
