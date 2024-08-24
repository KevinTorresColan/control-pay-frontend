import React, { forwardRef } from "react";
import { IButton } from "@/interface";
import { PolymorphicComponent, PolymorphicProps, Ref } from "@/interface";
import "./button.scss";

const prefix = "c-button";

export const Button: PolymorphicComponent<IButton, "button"> = forwardRef(
  <T extends React.ElementType>(
    {
      as,
      children,
      className,
      fullwidth,
      variant = "primary",
      ...props
    }: PolymorphicProps<IButton, T>,
    ref?: Ref<T>,
  ) => {
    const Component = as ?? "button";

    const itemClasses = [
      prefix,
      className,
      `${prefix}--${variant}`,
      fullwidth && `${prefix}--fullwidth`,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Component className={itemClasses} ref={ref} {...props}>
        {children}
      </Component>
    );
  },
);
