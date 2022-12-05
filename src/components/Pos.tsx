import { Vector } from "excalibur";

export function Pos(props: { pos: Vector }) {
  return (
    <>
      <span>{Math.floor(props.pos.y)}°</span>
      <span>{Math.floor(props.pos.x)}°</span>
    </>
  );
}
