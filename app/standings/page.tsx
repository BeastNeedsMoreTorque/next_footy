import pimps from '../helpers/pimps_long.json';
import calcStandings from '../helpers/calcStandings';

const options = {
    method: 'GET',
    headers: {
        'X-Auth-Token': process.env.NEXT_APP_FOOTBALL_API_KEY || '',
        //'Accept-Encoding': '',
    },
};

const BASE_URL = 'https://api.football-data.org/v4/';

async function getData() {
  const res = await fetch(`${BASE_URL}competitions/2021/matches?season=2022`, options)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

async function Standings() {
    const data = await getData()
    const results = data.matches.filter((p: { homeTeam: { name: string }; awayTeam: { name: string }; }) => !pimps.includes(p.homeTeam.name) && !pimps.includes(p.awayTeam.name))

    function gameStatus(g) {
      return g === 'FINISHED';
    }

  const matchResults = results
    .filter((r) => gameStatus(r.status))
    .map(m =>
    ({
      //   d: m.id,
      //   name: m.stage,
      awayTeam: m.awayTeam.name,
      homeTeam: m.homeTeam.name,
      awayCrest: m.awayTeam.crest,
      homeCrest: m.homeTeam.crest,
      //   status: m.status,
      //   outcome: m.score.winner,
      //dataDay: dataDay,
      //time: time,
      awayScore: m.score.fullTime.away,
      homeScore: m.score.fullTime.home,
    }))

    const sortedStandings = calcStandings(matchResults);
    
    console.log(JSON.stringify(matchResults));
    return (
      <>
        <div>Standings Next.js page</div>

        <div className='overflow-x-auto'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Pos</th>
                                <th>Crest</th>
                                <th>Team</th>
                                <th>GP</th>
                                <th>GF</th>
                                <th>GA</th>
                                <th>GD</th>
                                <th>Pts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedStandings.map((teamData, index) => (
                                <tr className='hover' key={index}>
                                    <td>{index + 1}</td>
                                    <td className='w-1 rounded-full'><img src={teamData.crest} alt='team-crest' /></td>
                                    <td>{teamData.team}</td>
                                    <td>{teamData.gp}</td>
                                    <td>{teamData.goalsScored}</td>
                                    <td>{teamData.goalsConceded}</td>
                                    <td>{teamData.goalsScored - teamData.goalsConceded}</td>
                                    <td>{teamData.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* <p>The season you selected is: {selectedSeason}</p> */}
                </div>
      </>
    )
}

export default Standings