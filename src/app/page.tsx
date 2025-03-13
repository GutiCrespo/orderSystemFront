import Home from "./components/home";

export default function Index() {

  return (
    <>
      {/* Page created inside "components" to avoid problems in server components side
          Every page created inside "app" is considered "server component" by the NextJS
      */}
      <Home/>
    </>
  );
}
