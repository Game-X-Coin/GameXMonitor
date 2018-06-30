import React from 'react';
import { Table as BootstrapTable } from 'reactstrap';

import './style.scss';

const Table = ({
  renderHeader = () => null,
  renderBody = () => null,
  vertical = false
}) => {
  return (
    <BootstrapTable className={vertical ? 'vertical' : ''} striped>
      <thead>{renderHeader()}</thead>
      <tbody>{renderBody()}</tbody>
    </BootstrapTable>
  );
};

export default Table;
