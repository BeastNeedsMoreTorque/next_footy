'use client'
import React, { useEffect, useState } from 'react'

const League = [
    {"Bundesliga": '2002'},
    {"EPL": '2021'},
    {"Championship": '2016'},
    {"League 1 (France)": '2015'},
    {"Serie A": '2019'},
    {"Holland": '2003'},
    {"Portugal": '2017'},
    {"Spain": '2014'},
    {"Brazil": '2013'},
]

function Leagues() {
    const [clicked, setClicked] = useState(false);
    const [selectedLeague, setSelectedLeague] = useState('2021');
    const [selectedSeason, setSelectedSeason] = useState('2022');

    useEffect(() => {
      if (clicked) {
      console.log("clicked");
    }
    }, [clicked]);

    function handClick() {
        setClicked(true);
    }

    const handleSelectedLeague = (event) => {
        setSelectedLeague(event.target.value);
    }

    /**
     * 
     * // suggested type for this function 
       const handleSelectedLeague = (event: { target: { value: React.SetStateAction<string>; }; }) => {
          setSelectedLeague(event.target.value);
        }
        OR bette:
        const handleSelectedLeague = (event: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedLeague(event.target.value);
        }

     */
    
  return (
      <>
          <div>
              <div>
                  <label className='label text-xl w-1/3'>
                      League:
                      <select className='select select-lg w-1/2 max-w-xs' value={selectedLeague} onChange={handleSelectedLeague}>
                          <option value="">Select a League</option>
                          {/* {Object.keys(Leagues).map((key, value) => (
                        <option key={key} value={value}>
                            {Leagues[key]}
                        </option>
                    ))} */}
                          {/* {Leagues.map((league) => <option key={league.key} value={league.value}></option>)} */}
                          {League.map((option, index) => {
                              const label = Object.keys(option)[0]; // Assuming each object has only one key
                              const value = option[label];
                              return (
                                  <option key={index} value={value}>
                                      {label}
                                  </option>
                              );
                          })}
                      </select>
                  </label>
              </div>
              <div>
                  <label className='label text-xl w-1/3'>
                      Season:
                      <select className='select select-lg w-1/2 max-w-xs' name="selectedSeason"
                          value={selectedSeason}
                          onChange={(e) => setSelectedSeason(e.target.value)}
                      >
                          <option value="2020">2020</option>
                          <option value="2021">2021</option>
                          <option value="2022">2022</option>
                          <option value="2023">2023</option>
                      </select>
                  </label>
              </div>
          </div>
          <button className='btn btn-primary' onClick={handClick}>Click Me</button>
      </>
  )
}

export default Leagues