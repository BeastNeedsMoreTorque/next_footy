import Leagues from "./leagues/page";
import Standings from "./standings/page";

export default async function Page() {
  return <main><Leagues /><Standings /></main>
}