import { IClassName } from "../className";

export interface ISelect
  extends IClassName,
    React.SelectHTMLAttributes<HTMLSelectElement> {
  fullwidth?: boolean;
  pageSizeOptions: number[];
}
