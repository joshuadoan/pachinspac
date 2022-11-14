import cx from "classnames";
import { Link, LinkProps } from "react-router-dom";
export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  specialProp?: string;
}

const buttonStyles =
  "px-4 py-3 bg-black text-white bg-opacity-50 flex gap-4 items:center border";
const buttonHoverStyles = "hover:bg-opacity-10 hover:bg-white ";

export function Button(props: ButtonProps) {
  const { children, ...rest } = props;
  return (
    <button
      {...rest}
      className={cx(buttonStyles, buttonHoverStyles, props.className)}
    >
      {children}
    </button>
  );
}

export function ButtonLink(props: LinkProps) {
  const { children, ...rest } = props;
  return (
    <Link
      {...rest}
      className={cx(buttonStyles, buttonHoverStyles, props.className)}
    >
      {children}
    </Link>
  );
}
