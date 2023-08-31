// const apiKey = process.env.NEXT_FOOTBALL_API_KEY;
// const apiKey = NEXT_FOOTBALL_API_KEY;

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
 
export default async function Page() {
  const data = await getData()
  console.log(JSON.stringify(data));
  
  return <main></main>
}