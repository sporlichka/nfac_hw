import { Outlet } from "react-router-dom";

export const Wrapper = () => {
  return (
    <article className={"w-full h-screen"}>
      <aside className={"w-90 h-screen bg-blue-500"}></aside>
      <Outlet />
    </article>
  );
};
