import { UserIcon } from "@heroicons/react/24/solid";
import { Actor } from "excalibur";
import { Meeple } from "../engine/Meeple";
import { ButtonLink } from "./Button";

function ActorList(props: { actors: Meeple[] }) {
  return (
    <ul className="h-full overflow-auto space-y-6">
      {props.actors.map((actor) => {
        return (
          <li key={actor.id} className="">
            <ButtonLink to={String(actor.id)} className="capitalize">
              {actor.icon}
              {actor.name}
            </ButtonLink>
          </li>
        );
      })}
    </ul>
  );
}

export default ActorList;
