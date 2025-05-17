"use client";
import ActivityList from "@/modules/activity/ActivityList";
import { Suspense } from "react";

const LoadingComponent = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100%",
    }}
  >
    <div style={{ color: "white" }}>Loading activities...</div>
  </div>
);

export default function ClientPage() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <ActivityList />
    </Suspense>
  );
}
