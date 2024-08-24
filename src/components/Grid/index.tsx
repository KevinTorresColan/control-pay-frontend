import { ElementType } from "react";
import { GridContainerProps, GridItemProps, GridProps } from "../../interface";
import "./grid.scss";

const spaceCalculate = (specificSpacing: number, spacing: number) =>
  specificSpacing ? -specificSpacing * 8 : -spacing * 8;

const prefix = "c-grid";

const ContainerComponent = <T extends ElementType = "div">({
  as,
  children,
  columnSpacing = 0,
  direction = "row",
  rowSpacing = 0,
  spacing = 0,
  wrap = "wrap",
  ...rest
}: GridContainerProps<T> & React.ComponentPropsWithoutRef<T>) => {
  const Component = as ?? "div";

  const itemClasses = [
    prefix,
    spacing && `${prefix}--spacing-${spacing}`,
    rowSpacing && `${prefix}--spacing-row-${rowSpacing}`,
    columnSpacing && `${prefix}--spacing-column-${columnSpacing}`,
    `${prefix}--direction-${direction}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component
      className={`${itemClasses}`}
      style={{
        width: `calc(100% + ${Math.abs(spaceCalculate(columnSpacing, spacing))}px)`,
        marginLeft: spaceCalculate(columnSpacing, spacing),
        marginTop: spaceCalculate(rowSpacing, spacing),
        flexWrap: wrap,
        ...rest?.style,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
};

const ItemComponent = <T extends ElementType = "div">({
  as,
  children,
  lg,
  md,
  sm,
  xs,
  ...rest
}: GridItemProps<T> & React.ComponentPropsWithoutRef<T>) => {
  const Component = as ?? "div";

  const itemClasses = [
    `${prefix}__item`,
    lg && `${prefix}--lg-${lg}`,
    md && `${prefix}--md-${md}`,
    sm && `${prefix}--sm-${sm}`,
    xs && `${prefix}--xs-${xs}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={itemClasses} {...rest}>
      {children}
    </Component>
  );
};

export const Grid = <T extends ElementType = "div">({
  as,
  children,
  columnSpacing,
  container,
  direction,
  item,
  lg,
  md,
  rowSpacing,
  sm,
  spacing,
  wrap,
  xs,
  ...props
}: GridProps<T> & React.ComponentPropsWithoutRef<T>) => {
  if (container) {
    return (
      <ContainerComponent
        as={as}
        columnSpacing={columnSpacing}
        direction={direction}
        rowSpacing={rowSpacing}
        spacing={spacing}
        wrap={wrap}
        {...props}
      >
        {children}
      </ContainerComponent>
    );
  }

  if (item) {
    return (
      <ItemComponent as={as} lg={lg} md={md} sm={sm} xs={xs} {...props}>
        {children}
      </ItemComponent>
    );
  }

  return <>{children}</>;
};
