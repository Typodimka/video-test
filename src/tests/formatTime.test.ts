import { formatTime } from "src/General/Components/Events";

describe("formatTime", () => {
  test("Должна форматировать 0 в '00:00:000'", () => {
    expect(formatTime(0)).toBe("00:00:000");
  });

  test("Должна форматировать 1.5 в '00:01:500'", () => {
    expect(formatTime(1.5)).toBe("00:01:500");
  });

  test("Должна форматировать 65.123 в '01:05:123'", () => {
    expect(formatTime(65.123)).toBe("01:05:123");
  });

  test("Должна форматировать 3599.999 в '59:59:999'", () => {
    expect(formatTime(3599.999)).toBe("59:59:999");
  });

  test("Должна форматировать 3600.456 в '60:00:456'", () => {
    expect(formatTime(3600.456)).toBe("60:00:456");
  });
});
