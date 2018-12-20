import React, { Component } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import './Time.scss';

dayjs.extend(relativeTime);

const getCorrectTime = date => {
  const dateInstance = new Date(date);

  return dateInstance.getTime() - dateInstance.getTimezoneOffset() * 60 * 1000;
};

class Time extends Component {
  render() {
    const { format, children } = this.props;

    const time = getCorrectTime(children);

    if (!children) {
      return null;
    }

    return (
      <span className="time" title={dayjs(time).format('YYYY-MM-DD hh:mm:ss')}>
        {format ? dayjs(time).format(format) : dayjs(time).fromNow()}
      </span>
    );
  }
}

export default Time;
