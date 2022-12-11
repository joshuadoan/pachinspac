import cx from "classnames";
import { Ship } from "../classes/Ship";
import Icon from "./Icon";
import { Activity } from "./Activity";
import { Pos } from "./Pos";
import { ButtonLink } from "./Button";

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
        <ButtonLink to={`/${String(ship.id)}`} className="capitalize">
          {ship.name}
        </ButtonLink>
        <Pos pos={ship.pos} />
      </div>

      <Activity destination={ship.destination} ship={ship} />
    </div>
  );
}
