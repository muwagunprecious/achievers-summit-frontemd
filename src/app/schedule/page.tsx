import type { Metadata } from "next";

import SchedulePage from "../../imports/Schedule";

export const metadata: Metadata = {
  title: "Schedule | Achievers Summit Africa",
  description:
    "Explore the Achievers Summit Africa programme across three days, four stages, and six tracks.",
};

export default function Page() {
  return <SchedulePage />;
}
