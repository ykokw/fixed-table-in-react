import React, { useRef, useState } from "react";
import styled from "styled-components";
import debounce from "lodash/debounce";
import "./App.css";

const Wrapper = styled.div`
  display: flex;
  padding: 24px;
  width: 900px;
  height: 501px;
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;
`;

const FixedTable = styled.table`
  width: 200px;
  height: 501px;
  overflow-y: hidden;
  display: block;
  position: absolute;
  border-top: 1px solid #ccc;
  & thead {
    width: 200px;
    display: block;
    position: absolute;
    z-index: 1;
  }
  & tr {
    width: 200px;
    height: 50px;
    display: block;
  }
  & th, & td {
    width: 198px;
    height: 49px;
    padding: 0;
    background-color: #fff;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    display: block;
  }
  & tbody {
    position: relative;
    display: block;
    width: 200px;
    top: 50px;
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
    top: 51px;
    height: 450px;
    overflow-y: scroll;
  }
  & tr {
    display: flex;
  }
  & th,
  & td {
    background-color: #fff;
    width: 199px;
    height: 49px;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 0;
    display: block;
  }
  & thead th {
    border-top: 1px solid #ccc;
    height: 49px;
    display: block;
    padding: 0;
  }
`;

const FixedTableBody: React.FC<{ scrollTop: number }> = ({
  scrollTop,
  children,
}) => {
  return <tbody style={{ transform: `translateY(${scrollTop * -1}px)` }}>{children}</tbody>;
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
              <th style={{ zIndex: 1}} />
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
            <tr style={{ display: 'flex', width: '4000px'}}>
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
