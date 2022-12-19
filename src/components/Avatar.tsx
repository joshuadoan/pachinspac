import { Color } from "excalibur";
import Blockies from "react-blockies";

export function Avatar({
  size,
  color,
  name,
  className,
}: {
  color: Color;
  name: string;
  size?: number;
  seed?: string;
  className?: string;
}) {
  return (
    <Blockies
      className={className}
      seed={`${color.toString()}${name}`}
      size={size || 8}
      color={color.toRGBA()}
    />
  );
}
