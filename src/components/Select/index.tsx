import { ISelect } from "../../interface";
import "./select.scss";

const prefix = "c-select";

export const Select: React.FC<ISelect> = ({
  className,
  fullwidth,
  pageSizeOptions,
  ...props
}) => {
  const itemClasses = [prefix, className, fullwidth && `${prefix}--fullwidth`]
    .filter(Boolean)
    .join(" ");

  return (
    <select className={itemClasses} {...props}>
      {pageSizeOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
