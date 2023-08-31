
import Standings from './page';

const StandingsLayout = ({
    children,
  }: {
    children: React.ReactNode,
  }) => {
  return (
      <>
          <div>StandingsLayout</div>
          <nav>
              <div className="navbar bg-neutral text-neutral-content">
                  <a className="btn btn-ghost normal-case text-xl">Standings</a>
              </div>
          </nav>
      </>
  )
}

export default StandingsLayout