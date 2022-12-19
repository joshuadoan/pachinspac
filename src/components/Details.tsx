import { Link } from "react-router-dom";
import cx from "classnames";
import { Meeple } from "../classes/Meeple";
import { Avatar } from "./Avatar";

export function Details(props: { actor: Meeple }) {
  const { actor } = props;
  return (
    <div className="px-4">
      {Object.values(actor.attributes.visitors).map((actor) => {
        return (
          actor && (
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
                {actor.attributes.chat.length && actor.attributes.chat[0]}
              </div>
            </div>
          )
        );
      })}
    </div>
  );
}
