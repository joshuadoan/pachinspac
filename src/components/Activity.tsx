import { BuildingStorefrontIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { Ship } from "../classes/Ship";
import { Station } from "../classes/Station";
import { ButtonLink } from "./Button";
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
      <div className="flex items-center gap-2">
        <span>{props.ship.status}</span>
        <Icon
          flavor="Station"
          style={{
            color: String(props.destination.color),
          }}
        />
        <ButtonLink to={`/${String(props.destination?.id)}`}>
          {props.destination?.name}
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span>Flying to</span>
      <Icon
        style={{
          color: String(props.destination.color),
        }}
        flavor={"Station"}
      />
      <ButtonLink
        to={"/" + String(props.destination?.id)}
        className="capitalize"
      >
        {props.destination?.name}
      </ButtonLink>
    </div>
  );
}
