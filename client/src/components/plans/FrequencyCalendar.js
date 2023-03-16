import React, { useEffect, useState } from 'react';
import { ResponsiveTimeRange } from '@nivo/calendar'

const FrequencyCalendar = () => {

  const [data, setData] = useState([])

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

  let timeRange = ""
  if (data?.startDate) {
    timeRange = <ResponsiveTimeRange
      data={data.frequencyPairs}
      from={data.startDate}
      to={data.endDate}
      emptyColor="#eeeeee"
      colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
      margin={{ top: 40, right: 40, bottom: 100, left: 40 }}
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
    />
  }

  return <> {timeRange} </>

}

export default FrequencyCalendar