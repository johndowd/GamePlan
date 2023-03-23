import React, { useEffect, useState } from 'react';
import { ResponsiveTimeRange } from '@nivo/calendar'
import { Redirect } from 'react-router-dom';
import { yearsToMonths } from 'date-fns';

const FrequencyCalendar = (props) => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [data, setData] = useState([])
  const [redirect, setRedirect] = useState(false)

  const fetchData = async () => {
    try {
      const response = await fetch("/api/v1/plans/frequency")
      const body = await response.json()
      setData(body)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (redirect) {
    return <Redirect {...props} to={redirect} />
  }

  let button = <a className='button disabled'>
    No date selected
  </a>
  if (selectedDate) {
    button = <a
      href={`/plans?d=${selectedDate}`}
      className='button'>
      See plans for {selectedDate}
    </a>
  }

  let dataViz = ""
  if (data?.startDate) {
    dataViz = <ResponsiveTimeRange
      data={data.frequencyPairs}
      from={data.startDate}
      to={data.endDate}
      emptyColor="#C7C4C0"
      colors={['#C7C4C0', '#FFBB90', '#F98D48']}
      margin={{ top: 0, right: 40, bottom: 0, left: 40 }}
      dayRadius={20}
      dayBorderWidth={1}
      dayBorderColor="#ffffff"
      onClick={(d, e) => {
        setSelectedDate(d.day)
      }}
      legends={
        [
          {
            anchor: 'bottom-right',
            direction: 'row',
            justify: false,
            itemCount: 2,
            itemWidth: 35,
            itemHeight: 70,
            itemsSpacing: 0,
            itemDirection: 'top-to-bottom',
            translateX: -60,
            translateY: -60,
            symbolSize: 15
          }
        ]}
    />
  }

  return <>{button} {dataViz}  </>

}

export default FrequencyCalendar