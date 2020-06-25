import React from "react";
import styled from "styled-components";
import {
  FixedSizeGrid,
  FixedSizeGridProps,
  GridChildComponentProps,
} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import faker from "faker";

import "./App.css";

const COLUMN_COUNT = 1000;
const ROW_COUNT = 1000;
const COLUMN_WIDTH = 150;
const ROW_HEIGHT = 50;

const Wrapper = styled.div`
  width: 80%;
  height: 80%;
  margin: 32px;
  position: absolute;
`;

const Grid: React.FC<{
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
}> = ({ columnIndex, rowIndex, style }) => (
  <div
    style={{
      ...style,
      border: "1px solid #ccc",
      boxSizing: "border-box",
      borderTop: "none",
      borderRight: "none",
      backgroundColor: "#fff",
    }}
  >
    {`rowIndex: ${rowIndex} / columnIndex: ${columnIndex}`}
  </div>
);

const ItemWrapper: React.FC<GridChildComponentProps> = ({
  columnIndex,
  rowIndex,
  style,
  data,
}) => {
  const { ItemRenderer } = data;
  // avoid render for fixed row header and columns
  if (columnIndex === 0 || rowIndex === 0) return null;
  return (
    <ItemRenderer columnIndex={columnIndex} rowIndex={rowIndex} style={style} />
  );
};

const StickyGrid: React.FC<FixedSizeGridProps> = ({ children, ...rest }) => (
  <FixedSizeGrid itemData={{ ItemRenderer: children }} {...rest}>
    {ItemWrapper}
  </FixedSizeGrid>
);

const StickyRow: React.FC = () => (
  <div style={{ display: "flex", position: "sticky", top: 0, zIndex: 10 }}>
    {[...Array(COLUMN_COUNT)].map((_, i) => (
      <div
        key={faker.random.uuid()}
        style={{
          width: COLUMN_WIDTH,
          height: ROW_HEIGHT,
          border: "1px solid #ccc",
          borderRight: "none",
          boxSizing: "border-box",
          backgroundColor: "#fff",
          position: i === 0 ? 'sticky' : 'static',
          left: i === 0 ? 0 : 'unset',
        }}
      >{`rowIndex: 0 / columnIndex: ${i}`}</div>
    ))}
  </div>
);

const StickyColumn: React.FC = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      position: "sticky",
      left: 0,
      width: `${COLUMN_WIDTH}px`,
      zIndex: 5,
    }}
  >
    {[...Array(ROW_COUNT)].map(
      (_, i) =>
        i !== 0 && (
          <div
            key={faker.random.uuid()}
            style={{
              width: COLUMN_WIDTH,
              height: ROW_HEIGHT,
              border: "1px solid #ccc",
              borderTop: "none",
              borderRight: "none",
              boxSizing: "border-box",
              backgroundColor: "#fff",
            }}
          >{`rowIndex: ${i} / columnIndex: 0`}</div>
        )
    )}
  </div>
);

const InnerElement = React.forwardRef<HTMLDivElement>(function InnerElement(
  { children, ...rest },
  ref
) {
  return (
    <div ref={ref} {...rest}>
      <StickyRow />
      <StickyColumn />
      {children}
    </div>
  );
});

const App: React.FC = () => (
  <Wrapper>
    <AutoSizer>
      {({ width, height }) => (
        <StickyGrid
          innerElementType={InnerElement}
          width={width}
          height={height}
          columnCount={COLUMN_COUNT}
          rowCount={ROW_COUNT}
          columnWidth={COLUMN_WIDTH}
          rowHeight={ROW_HEIGHT}
        >
          {Grid}
        </StickyGrid>
      )}
    </AutoSizer>
  </Wrapper>
);

export default App;
