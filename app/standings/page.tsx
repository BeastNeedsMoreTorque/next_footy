import pimps from '../helpers/pimps_long.json';
import calcStandings from '../helpers/calcStandings';
import LeagueComponent from '../leagues/LeagueComponent'
import { useState } from 'react';

const Leagues = [
  { "Bundesliga": '2002' },
  { "EPL": '2021' },
  { "Championship": '2016' },
  { "League 1 (France)": '2015' },
  { "Serie A": '2019' },
  { "Holland": '2003' },
  { "Portugal": '2017' },
  { "Spain": '2014' },
  { "Brazil": '2013' },
]



const options = {
  method: 'GET',
  headers: {
    'X-Auth-Token': process.env.NEXT_APP_FOOTBALL_API_KEY || '',
    //'Accept-Encoding': '',
  },
};

const BASE_URL = 'https://api.football-data.org/v4/';

async function getData() {
  //the question is why did i put the season and league select buttons
  // in another module/file? how do i pass the state to this file?
  //in my other project vite-simple i put the buttons in the App2.jsx file.
  //const res = await fetch(`${BASE_URL}competitions/${selectedLeague}/matches?season=${selectedSeason}`, options)
  // const res = await fetch(`${BASE_URL}competitions/${league}/matches?season=2022`, options)
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
  // const [selectedLeague, setSelectedLeague] = useState('2021')
  // const [selectedSeason, setSelectedSeason] = useState('2022')


  const data = await getData()
  const results = data.matches.filter((p: { homeTeam: { name: string }; awayTeam: { name: string }; }) => !pimps.includes(p.homeTeam.name) && !pimps.includes(p.awayTeam.name))


  const handleSelectedLeague = (event) => {
    setSelectedLeague(event.target.value);
  }

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
      <div>

        {/* <LeagueComponent 
          selectedValue={selectedLeague}
          onChange={handleSelectedLeague}
          options={Leagues}
        /> */}

        <select
          value={selectedLeague}
          onChange={handleSelectedLeague}
        >
          <option value="">Select a League</option>
          {/* {Object.keys(Leagues).map((key, value) => (
                        <option key={key} value={value}>
                            {Leagues[key]}
                        </option>
                    ))} */}
          {/* {Leagues.map((league) => <option key={league.key} value={league.value}></option>)} */}
          {Leagues.map((option, index) => {
            const label = Object.keys(option)[0]; // Assuming each object has only one key
            const value = option[label];
            return (
              <option key={index} value={value}>
                {label}
              </option>
            );
          })}
        </select>
      </div>
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