import { Meeple } from "../engine/Meeple";
import Icon from "./Icon";
import { Pos } from "./Pos";

export function StationDetails(props: { selected: Meeple }) {
  return (
    <div className="flex gap-4">
      <Icon
        flavor="Station"
        className="h-6 w-6"
        style={{
          color: String(props.selected.color),
        }}
      />{" "}
      {props.selected.name}
      <Pos pos={props.selected.pos} />
    </div>
  );
}
