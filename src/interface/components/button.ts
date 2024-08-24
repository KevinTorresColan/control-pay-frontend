import { PropsWithChildren } from "react";

type variantButton = "primary" | "secondary" | "tertiary";

export interface IButton extends PropsWithChildren {
  variant?: variantButton;
  fullwidth?: NonNullable<boolean>;
}
