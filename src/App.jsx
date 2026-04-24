import { BriefingPage, DebriefPage, FieldPage, MissionsPage } from "./pages";
import { useEffect, useState } from "react";

export default function App() {
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    function handleHashChange() {
      setRoute(getRoute());
    }
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (route === "/missions") return <MissionsPage />;
  if (route === "/field") return <FieldPage />;
  if (route === "/debrief") return <DebriefPage />;
  return <BriefingPage />;
}

function getRoute() {
  const hash = window.location.hash.replace(/^#/, "") || "/";
  return hash;
}
