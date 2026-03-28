import React, { Suspense, lazy } from "react";
import Loader from "./components/loader/Loader";

const Viewer = lazy(() => import("./pages/Viewer"));

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Viewer />
    </Suspense>
  );
}