import { ButtonLink } from "./Button";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Meeple } from "../engine/Meeple";

function Selection(props: { selected: Meeple }) {
  return (
    <div className="flex gap-4">
      <ButtonLink to="/">
        <ChevronLeftIcon className="h-6 w-6" />
        back
      </ButtonLink>

      <ButtonLink to={`/${String(props.selected.id)}`} className="capitalize ">
        {props.selected.icon}
        {props.selected.name}
        <span>x: {Math.floor(props.selected.pos.x)}</span>
        <span>y: {Math.floor(props.selected.pos.y)}</span>
      </ButtonLink>
    </div>
  );
}

export default Selection;
