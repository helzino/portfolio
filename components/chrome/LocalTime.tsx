"use client";

import { useEffect, useState } from "react";

/** Local time where she is, ticking. Rendered only after mount to keep the
 *  server and client markup identical. */
export function LocalTime({ timeZone = "Europe/London" }: { timeZone?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone,
        }).format(new Date())
      );
    format();
    const id = window.setInterval(format, 15000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return (
    <span className="numeral" suppressHydrationWarning>
      {time ?? "--:--"}
    </span>
  );
}
