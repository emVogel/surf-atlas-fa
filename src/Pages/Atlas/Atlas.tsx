import { Outlet } from "react-router-dom";

import { Suspense } from "react";

import { Skeleton } from "./components/skeleton/Skeleton";

function Atlas() {
  return (
    <Suspense fallback={<Skeleton />}>
      <section className="atlas">
        <Outlet />
      </section>
    </Suspense>
  );
}

export default Atlas;
