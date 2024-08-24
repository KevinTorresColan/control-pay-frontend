import { PropsWithChildren } from "react";

export interface IInputWithInfo extends PropsWithChildren {
  label?: string;
  error?: string;
}
