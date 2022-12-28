import {useEffect, useRef, useState} from 'react';

const PartName = {
  MORNING: 'MORNING',
  AFTERNOON: 'AFTERNOON',
  EVENING: 'EVENING',
  NIGHT: 'NIGHT',
};

const PartConfigs = {
  [PartName.MORNING]: {
    name: PartName.MORNING,
    greetingContent: 'Chào buổi sáng',
    startHour: 5,
  },
  [PartName.AFTERNOON]: {
    name: PartName.AFTERNOON,
    greetingContent: 'Chào buổi trưa',
    startHour: 12,
  },
  [PartName.EVENING]: {
    name: PartName.EVENING,
    greetingContent: 'Chào buổi chiều',
    startHour: 18,
  },
  [PartName.NIGHT]: {
    name: PartName.NIGHT,
    greetingContent: 'Khuya rồi',
    startHour: 23,
  },
};

const PartTimelines = [
  PartName.MORNING,
  PartName.AFTERNOON,
  PartName.EVENING,
  PartName.NIGHT,
];

function getPartByHour(hour) {
  if (hour <= PartConfigs[PartTimelines[0]].startHour) {
    const lastPartNameInTimeline = PartTimelines[PartTimelines.length - 1];
    return PartConfigs[lastPartNameInTimeline];
  }
  const validParts = PartTimelines.filter(partName => {
    const part = PartConfigs[partName];
    return part.startHour <= hour;
  });
  return validParts ? PartConfigs[validParts[validParts.length - 1]] : null;
}

function getNextPart(currentPartName) {
  const currentTimelineIndex = PartTimelines.indexOf(currentPartName);
  const nextTimelineIndex =
    currentTimelineIndex + 1 === PartTimelines.length
      ? 0
      : currentTimelineIndex + 1;
  return PartConfigs[PartTimelines[nextTimelineIndex]];
}

function getCurrentHour24hFormat() {
  const date = new Date().toLocaleTimeString([], {
    hourCycle: 'h23',
    hour: '2-digit',
    minute: '2-digit',
  });
  return Number(date.substring(0, 2));
}

function getDelayTimeout() {
  const currentHour = getCurrentHour24hFormat();
  const currentPart = getPartByHour(currentHour);
  const nextPart = getNextPart(currentPart.name);

  let nowDate = new Date();
  const nextTimeDate = new Date();

  if (currentPart.name !== PartName.NIGHT) {
    nextTimeDate.setDate(nextTimeDate.getDate() - 1);
  }

  nextTimeDate.setHours(nextPart.startHour, 0, 0, 0);
  return nextTimeDate - nowDate;
}

export default function usePartOfDay() {
  const [currentPart, setCurrentPart] = useState(
    getPartByHour(getCurrentHour24hFormat()),
  );
  const timer = useRef(null);

  useEffect(() => {
    return () => {
      // console.log('before timer.current: ', timer.current);
      clearTimeout(timer.current);
      // console.log('after timer.current: ', timer.current);
    };
  }, []);

  useEffect(() => {
    clearTimeout(timer.current);
    const timeout = getDelayTimeout();
    // console.log('timeout: ', timeout);
    const nextPart = getNextPart(currentPart);
    timer.current = setTimeout(() => {
      setCurrentPart(nextPart);
    }, timeout);
  }, [currentPart]);

  return {currentPart, nextPart: getNextPart(currentPart)};
}
