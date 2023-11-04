import { get10YearsFromThisYear } from "@/utils/dateUtils";

// @ts-ignore
test("test getYearsFromThisYear", () => {
  const years = [
    2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028,
  ];

  //@ts-ignore
  expect(get10YearsFromThisYear(2023)).toStrictEqual(years);
});

// @ts-ignore
test("test array", () => {
  const months = [4, 5, 6, 7];

  // @ts-ignore
  expect([1, 2, 3, ...months]).toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
  // @ts-ignore
  expect([...months, 8, 9, 10]).toStrictEqual([4, 5, 6, 7, 8, 9, 10]);
});
