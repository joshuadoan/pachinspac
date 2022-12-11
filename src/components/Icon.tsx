import {
  PaperAirplaneIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { BuildingStorefrontIcon } from "@heroicons/react/24/solid";
import cx from "classnames";
import { SVGProps } from "react";
import { MeepleFlavor } from "../classes/Meeple";

function Icon(props: { flavor: MeepleFlavor } & SVGProps<SVGSVGElement>) {
  const { flavor, ...rest } = props;
  return {
    Meeple: <PaperAirplaneIcon className={cx(`h-6 w-6`)} {...rest} />,
    Ship: <RocketLaunchIcon className={cx(`h-6 w-6`)} {...rest} />,
    Station: <BuildingStorefrontIcon className="h-6 w-6" {...rest} />,
  }[props.flavor];
}
export default Icon;
