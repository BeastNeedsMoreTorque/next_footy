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
  console.log(JSON.stringify(data));
  return (
    <div>Standings page</div>
  )
}

export default Standings