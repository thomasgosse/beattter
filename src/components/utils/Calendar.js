import React, { useEffect, useState } from 'react';
import * as RNCalendars from 'react-native-calendars';

import useTheme from '../hooks/useTheme';

function Calendar({ setStartingDay, setEndingDay }) {
  const [today, setToday] = useState();
  const [markedDates, setMarkedDates] = useState({});
  const { colors } = useTheme();

  useEffect(() => {
    const todayDate = new Date();
    const todayDateString = createDateString(todayDate.getFullYear(), todayDate.getMonth() + 1, todayDate.getDate());
    setToday(todayDateString);
  }, []);

  function createDateString(y, m, d) {
    var dateString = y + '-';
    if (m < 10) {
      dateString += '0' + m + '-';
    } else {
      dateString += m + '-';
    }
    if (d < 10) {
      dateString += '0' + d;
    } else {
      dateString += d;
    }
    return dateString;
  }

  function goToNextDay(date) {
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
  }

  function onDayPress(e) {
    const selectedDate = e.dateString;

    let dates = Object.keys(markedDates);
    const isStartingEnding = markedDates[dates[0]]?.startingDay && markedDates[dates[0]]?.endingDay;
    if (dates.length >= 2 || isStartingEnding) {
      setStartingDay(null);
      setEndingDay(null);
      dates = [];
    }

    if (dates.length === 0) {
      setStartingDay(selectedDate);
      setMarkedDates({ [selectedDate]: { color: colors.textTitle, textColor: colors.header } });
    } else if (selectedDate === dates[0]) {
      markedDates[dates[0]].startingDay = true;
      markedDates[dates[0]].endingDay = true;
      setEndingDay(selectedDate);
      setMarkedDates({ ...markedDates });
    } else {
      const isSelectedEndingDay = selectedDate > dates[0];
      const markedDate = {
        [selectedDate]: {
          startingDay: !isSelectedEndingDay,
          endingDay: isSelectedEndingDay,
          color: colors.textTitle,
          textColor: colors.header,
        },
      };
      markedDates[dates[0]].startingDay = isSelectedEndingDay;
      markedDates[dates[0]].endingDay = !isSelectedEndingDay;
      setEndingDay(isSelectedEndingDay ? selectedDate : dates[0]);
      setStartingDay(!isSelectedEndingDay ? selectedDate : dates[0]);

      const lastDate = isSelectedEndingDay ? new Date(selectedDate) : new Date(dates[0]);
      let startDate = !isSelectedEndingDay ? new Date(selectedDate) : new Date(dates[0]);
      goToNextDay(startDate);
      while (startDate.getTime() < lastDate.getTime()) {
        let dateString = createDateString(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate());
        markedDates[dateString] = { color: colors.textTitleLighter, textColor: colors.header };
        goToNextDay(startDate);
      }

      setMarkedDates({ ...markedDates, ...markedDate });
    }
  }

  return (
    <RNCalendars.Calendar
      theme={{
        textDayFontFamily: 'Helvetica Neue',
        textMonthFontFamily: 'Helvetica Neue',
        textDayHeaderFontFamily: 'Helvetica Neue',
        textDayFontWeight: '400',
        textDayHeaderFontWeight: '400',
        textMonthFontWeight: 'bold',
        arrowColor: colors.textBaseLight,
      }}
      minDate={today}
      markingType="period"
      markedDates={markedDates}
      enableSwipeMonths={true}
      onDayPress={onDayPress}
    />
  );
}

export default Calendar;
