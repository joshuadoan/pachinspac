import { Link } from "react-router-dom";
import cx from "classnames";
import { Meeple } from "../classes/Meeple";
import { Avatar } from "./Avatar";
import { getChat } from "../routines/getChat";

export function Visitors(props: { visitors: Meeple[] }) {
  if (!props.visitors.length) return null;
  return (
    <div>
      <h2 className="px-4 py-2">visitors {props.visitors.length}</h2>
      <div className="flex gap-2 bg-white px-4 py-2 mb-4">
        {props.visitors.map(
          (visitor) =>
            visitor && (
              <Avatar
                color={visitor.color}
                name={visitor.name}
                className="mask mask-circle "
                size={6}
              />
            )
        )}
      </div>
      <div className="px-4">
        {props.visitors.map((actor) => {
          if (!actor) return null;
          return (
            <div
              className={cx("chat", {
                "chat-end": actor.id % 2 === 0,
                "chat-start": actor.id % 2 !== 0,
              })}
              key={actor.id}
            >
              <div className="chat-image avatar">
                <Link to={`/${actor.id}`}>
                  <Avatar
                    color={actor.color}
                    name={actor.name}
                    className="mask mask-circle w-6 h-6 mr-4"
                  />
                </Link>
              </div>
              <div className="chat-header capitalize">{actor.name}</div>
              <div className="chat-bubble first-letter:capitalize">
                {getChat(actor.id).chat}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
