import cx from "classnames";
import { Ship } from "../engine/Ship";
import Icon from "./Icon";
import { Activity } from "./Activity";
import { Pos } from "./Pos";

//  public icon: ReactNode = (<PaperAirplaneIcon className="h-6 w-6" />);
export function ShipDetails(props: { ship: Ship }) {
  const { ship } = props;
  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <Icon
          flavor="Ship"
          className={cx(`h-6 w-6`)}
          style={{
            color: String(ship.color),
          }}
        />
        <span className="capitalize"> {ship.name}</span>
        <Pos pos={ship.pos} />
      </div>

      <Activity destination={ship.destination} ship={ship} />
    </div>
  );
}
