import React, { useEffect, useState } from 'react';
import { ResponsiveTimeRange } from '@nivo/calendar'
import { Redirect } from 'react-router-dom';

const FrequencyCalendar = () => {
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
    return <Redirect to={redirect} />
  }

  let dataViz = ""
  if (data?.startDate) {
    dataViz = <ResponsiveTimeRange
      data={data.frequencyPairs}
      from={data.startDate}
      to={data.endDate}
      emptyColor="#eeeeee"
      colors={['#C7C4C0', '#FFE8D9', '#FFBB90', '#F98D48']}
      margin={{ top: 0, right: 40, bottom: 100, left: 40 }}
      dayRadius={5}
      dayBorderWidth={1}
      dayBorderColor="#ffffff"
      onClick={(d, e) => {
        setRedirect(`/plans?d=${d.day}`)
      }}
    />
  }

  return <> {dataViz} </>

}

export default FrequencyCalendar