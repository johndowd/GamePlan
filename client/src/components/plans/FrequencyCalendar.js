import React, { useEffect, useState } from 'react';
import { ResponsiveCalendar } from '@nivo/calendar'

const FrequencyCalendar = () => {

  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      const response = await fetch("/api/v1/plans/frequency")
      const body = await response.json()
      setData(body.frequencyPairs)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <ResponsiveCalendar
      data={data}
      from="2023-01-02"
      to="2023-12-30"
      emptyColor="#eeeeee"
      colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
      margin={{ top: 0, right: 20, bottom: 10, left: 20 }}
      yearSpacing={20}
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'row',
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: 'right-to-left'
        }
      ]}
    />
  )
}

export default FrequencyCalendar