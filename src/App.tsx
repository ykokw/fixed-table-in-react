import React, { useRef, useState } from "react";
import styled from "styled-components";
import debounce from "lodash/debounce";
import "./App.css";

const Wrapper = styled.div`
  display: flex;
  width: 900px;
  height: 500px;
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;
`;

const FixedTable = styled.table`
  width: 200px;
  height: 500px;
  overflow-y: hidden;
  display: block;
  position: absolute;
  & th {
    width: 200px;
    height: 50px;
  }
  & tbody {
    position: relative;
    display: block;
  }
`;

const StyledTable = styled.table`
  table-layout: fixed;
  width: 100%;
  position: relative;
  left: 200px;
  display: block;
  overflow-x: scroll;
  & thead,
  & tbody {
    display: block;
    width: 4000px;
  }
  & thead {
    position: absolute;
  }
  & tbody {
    position: relative;
    top: 50px;
    height: 450px;
    overflow-y: scroll;
  }
  & th,
  & td {
    width: 200px;
    height: 50px;
  }
  & thead th {
    text-align: left;
  }
`;

const FixedTableBody: React.FC<{ scrollTop: number }> = ({
  scrollTop,
  children,
}) => {
  return <tbody style={{ top: `${scrollTop * -1}px` }}>{children}</tbody>;
};

const TableBodyWithRef: React.FC<{ handleScroll: Function }> = ({
  handleScroll,
  children,
}) => {
  const tbodyRef = useRef<HTMLTableSectionElement>(null);
  const onScroll = () => {
    tbodyRef && tbodyRef.current && handleScroll(tbodyRef.current.scrollTop);
  };
  return (
    <tbody ref={tbodyRef} onScroll={debounce(onScroll, 10)} className="TableBodyWithRef">
      {children}
    </tbody>
  );
};

function App() {
  const [scrollTop, setScrollTop] = useState(0);
  return (
    <div className="App">
      <Wrapper>
        <FixedTable>
          <thead>
            <tr>
              <th />
            </tr>
          </thead>
          <FixedTableBody scrollTop={scrollTop}>
            {Array.from(new Array(29)).map((v, rowIndex) => (
              <tr key={`rowIndex-${rowIndex}`}>
                <th
                  className="fixed"
                  key={rowIndex.toString()}
                >{`row header: ${rowIndex} row`}</th>
              </tr>
            ))}
          </FixedTableBody>
        </FixedTable>
        <StyledTable>
          <thead>
            <tr>
              {Array.from(new Array(19)).map((v, i) => (
                <th key={i.toString()}>{`header ${i}`}</th>
              ))}
            </tr>
          </thead>
          <TableBodyWithRef
            handleScroll={(scrollTop: number) => setScrollTop(scrollTop)}
          >
            {Array.from(new Array(29)).map((v, rowIndex) => (
              <tr key={`rowIndex-${rowIndex}`}>
                {Array.from(new Array(19)).map((v, i) => (
                  <td
                    className="dataCell"
                    key={i.toString()}
                  >{`row ${rowIndex} /  data ${i}`}</td>
                ))}
              </tr>
            ))}
          </TableBodyWithRef>
        </StyledTable>
      </Wrapper>
    </div>
  );
}

export default App;
