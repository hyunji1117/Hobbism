'use client';

import { LiveDataType } from '@/components/features/live/LiveCalendarBtn';
import moment from 'moment';
import 'moment/locale/ko';
import { useEffect, useState } from 'react';

export const LiveCalendar = ({ liveData }: { liveData: LiveDataType[] }) => {
  const [selectedDate, setSelectedDate] = useState(moment());

  // moment 로케일을 한국어로 설정
  useEffect(() => {
    moment.locale('ko');
  }, []);

  const startOfWeek = moment(selectedDate).startOf('week');

  const weekDays = Array.from({ length: 7 }, (_, i) =>
    moment(startOfWeek).add(i, 'days'),
  );

  const handleDateClick = (date: moment.Moment) => {
    setSelectedDate(date);
  };

  const weeklyLives = liveData.filter(live =>
    weekDays.some(day => live.start.isSame(day, 'day')),
  );

  return (
    <>
      <div className="w-full rounded-b-3xl bg-white px-2.5 pt-7 pb-3">
        <div className="flex w-full justify-center gap-3 px-2.5">
          {weekDays.map(day => {
            const dayOfWeek = day.day(); // 0: 일요일, 6: 토요일
            const isSunday = dayOfWeek === 0;
            const isSaturday = dayOfWeek === 6;

            const textColor = isSaturday
              ? 'text-[#51AAED]'
              : isSunday
                ? 'text-[#FE508B]'
                : 'text-black';

            const hasLive = liveData.some(live =>
              live.start.isSame(day, 'day'),
            );
            return (
              <div
                key={day.format('YYYY-MM-DD')}
                onClick={() => handleDateClick(day)}
                className={`w-[calc(100%/7)] cursor-pointer rounded-sm bg-white text-center`}
              >
                {/* 일 월 화 수 목 금 토 일 */}
                <div className={`mb-3 ${textColor}`}>{day.format('dd')}</div>
                {/* 날짜 */}
                <div className={`${textColor} flex flex-col items-center`}>
                  {day.format('D')}

                  {hasLive && (
                    <div className="mb-5 h-1.5 w-1.5 rounded-full bg-[#FE508B]"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="px-2.5">
          <h2 className="mt-4 border-b-2 pb-1 text-lg font-semibold">
            예정된 라이브 방송
          </h2>

          <ul className="">
            {weeklyLives.length === 0 ? (
              <li className="py-3 text-sm text-[#4B5563]">
                이번 주 라이브 일정이 없습니다.
              </li>
            ) : (
              weeklyLives.map(live => (
                <li key={live.id} className="flex py-2">
                  <h3>
                    {live.start.format('M월 D일')}
                    <small className="block text-[#4B5563]">
                      {live.start.format('HH:mm')}
                    </small>
                  </h3>
                  <p className="mt-1 ml-7 text-sm">{live.title}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
