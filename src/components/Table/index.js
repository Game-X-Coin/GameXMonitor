import React from 'react';
import classNames from 'classnames';
import { Table as BootstrapTable } from 'reactstrap';
import LoadingSpinner from '../LoadingSpinner';

import './style.scss';

const Table = ({
  renderHeader = () => null,
  renderBody = () => null,
  fetching = false
}) => {
  return (
    <div className={classNames('table-wrapper', fetching && 'fetching')}>
      <BootstrapTable striped>
        <thead>{renderHeader()}</thead>
        <tbody>
          {fetching ? (
            <tr>
              <td className="position-relative loading-row" colSpan="100">
                <LoadingSpinner />
              </td>
            </tr>
          ) : (
            renderBody()
          )}
        </tbody>
      </BootstrapTable>
    </div>
  );
};

export default Table;
