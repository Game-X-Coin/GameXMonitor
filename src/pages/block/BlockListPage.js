import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import qs from 'query-string';

import { BlockList } from '../../views/block';
import Pagination from '../../components/Pagination';
import { Header, Page } from '../../components/Pages';
import LoadingSpinner from '../../components/LoadingSpinner';

@inject('dataStore')
@observer
class BlockListPage extends Component {
  componentDidMount() {
    this.request();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.request();
    }
  }

  request() {
    const { getBlocks } = this.props.dataStore;
    const { page } = qs.parse(this.props.location.search);

    getBlocks(page);
  }

  render() {
    const { blocks, requests } = this.props.dataStore;
    const { page = 1 } = qs.parse(this.props.location.search);
    const pageNum = Number(page);

    return (
      <Page>
        {requests.getBlocks.fetching && <LoadingSpinner global />}

        <Header>Blocks</Header>
        <BlockList blocks={blocks} />

        <Pagination
          current={pageNum}
          total={1000}
          prevLink={`/blocks?page=${pageNum - 1}`}
          nextLink={`/blocks?page=${pageNum + 1}`}
        />
      </Page>
    );
  }
}

export default BlockListPage;
