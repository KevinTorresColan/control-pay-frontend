import { forwardRef } from "react";
import {
  IInput,
  PolymorphicComponent,
  PolymorphicProps,
  Ref,
} from "@/interface";
import "./input.scss";

const prefix = "c-input";

export const Input: PolymorphicComponent<IInput, "input"> = forwardRef(
  <T extends React.ElementType>(
    { as, className, fullwidth, ...props }: PolymorphicProps<IInput, T>,
    ref?: Ref<T>,
  ) => {
    const Component = as ?? "input";

    const itemClasses = [prefix, className, fullwidth && `${prefix}--fullwidth`]
      .filter(Boolean)
      .join(" ");

    return <Component className={itemClasses} {...props} ref={ref} />;
  },
);
