import cx from "classnames";
import { Link, LinkProps } from "react-router-dom";
export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  specialProp?: string;
}

export function Button(props: ButtonProps) {
  const { children, ...rest } = props;
  return (
    <button {...rest} className={cx("px-4 py-2 bg-white", props.className)}>
      {children}
    </button>
  );
}

export function ButtonLink(props: LinkProps) {
  const { children, ...rest } = props;
  return (
    <Link {...rest} className={cx("px-4 py-2 bg-white", props.className)}>
      {children}
    </Link>
  );
}
