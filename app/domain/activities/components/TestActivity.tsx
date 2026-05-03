"use client";

import { useActivtyQuery } from "../hooks/useActivityQuery";

export const TestActivity = () => {
  const { data } = useActivtyQuery();
  return (
    <div>
      {data?.map((activity) => (
        <p key={activity.id}>{activity.activityDate}</p>
      ))}
    </div>
  );
};
