import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { Actor } from "excalibur";
import { ReactNode } from "react";

export class Meeple extends Actor {
  public health: number = 100;
  public icon: ReactNode = (<QuestionMarkCircleIcon className="h-6 w-6" />);
}
