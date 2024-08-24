import { forwardRef, Ref } from "react";
import {
  IInputWithInfo,
  PolymorphicComponent,
  PolymorphicProps,
} from "@/interface";
import "./inputWithInfo.scss";

const prefix = "c-input-whith-info";

export const InputWithInfo: PolymorphicComponent<IInputWithInfo, "div"> =
  forwardRef(
    <T extends React.ElementType>(
      {
        as,
        children,
        className,
        error,
        label,
        ...props
      }: PolymorphicProps<IInputWithInfo, T>,
      ref?: Ref<T>,
    ) => {
      const Component = as || "div";

      const itemClasses = [prefix, className, error && `${prefix}--error`]
        .filter(Boolean)
        .join(" ");

      return (
        <Component className={itemClasses} {...props} ref={ref}>
          {label && <label>{label}</label>}
          {children}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Component>
      );
    },
  );
