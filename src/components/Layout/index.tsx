import { ILayout } from "@/interface";

export const Layout = ({ children }: ILayout) => {
  return (
    <div style={{ width: "100%", height: "60px", backgroundColor: "teal" }}>
      {children}
    </div>
  );
};
