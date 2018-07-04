import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const getCorrectTime = date => {
  const dateInstance = new Date(date);

  return dateInstance.getTime() - dateInstance.getTimezoneOffset() * 60 * 1000;
};

const Time = props => {
  if (!props.children) {
    return null;
  }

  const time = getCorrectTime(props.children);

  return props.format
    ? dayjs(time).format(props.format)
    : dayjs(time).fromNow();
};

export default Time;
