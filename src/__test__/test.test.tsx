import { User } from "@/types/dao";
import "@testing-library/jest-dom";
import mockAxois from "axios";

// @ts-ignore
test("test", async () => {
  const texts = ["user", "name", "is"];
  let display = "";
  display = JSON.stringify(texts);
  display = display.replaceAll('",','", ')
  // texts.forEach((text) => {
  //   display = `${display}, `;
  // });
  //@ts-ignore
  expect(display).toBe(`["user", "name", "is"]`);
});


