import styles from "./Schedule.module.scss";
import { useRef, useState } from "react";
const hours = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];
const minutes = [0, 15, 30, 45];
const createTimes = () => {
  const times: string[] = [];
  hours.forEach((hour) => {
    minutes.forEach((minute) => {
      times.push(
        `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
      );
    });
  });
  return times;
};

const SchedulePage = () => {
  const [times, setTimes] = useState<string[]>(createTimes());
  const [selected, setSelected] = useState<boolean[]>(
    createTimes().map(() => false)
  );
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const selectFlag = useRef<boolean>(false);
  return (
    <div className={styles.container}>
      <div className={styles.scrollBox}>
        <div className={styles.flexBox}>
          <div>
            {times.map((time, index) => (
              <div
                key={`index${index}`}
                className={`${styles.time} ${
                  time.endsWith("00") === false && styles.smallText
                }`}>
                {time}
              </div>
            ))}
            <div>00:00</div>
          </div>
          <div
            className={styles.timeTable}
            onMouseDown={() => {
              setIsMouseDown(() => true);
            }}
            onMouseUp={() => {
              setIsMouseDown(() => false);
            }}>
            {times.map((time, timeIndex) => (
              <div
                id={timeIndex.toString()}
                key={timeIndex}
                className={`${styles.line} ${
                  timeIndex === times.length - 1 && styles.borderBottom
                } ${selected[timeIndex] && styles.selected}`}
                onMouseDown={() => {
                  const selectedTimes = [...selected];
                  selectFlag.current = !selected[timeIndex];
                  selectedTimes[timeIndex] = selectFlag.current;
                  setSelected(() => [...selectedTimes]);
                }}
                onClick={() => {}}
                onMouseEnter={() => {
                  const selectedItems = [...selected];
                  if (!isMouseDown) {
                    return;
                  }
                  selectedItems[timeIndex] = selectFlag.current;
                  setSelected(() => [...selectedItems]);
                }}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
