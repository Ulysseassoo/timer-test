import { Box, Center, Flex, HStack, Text, VStack } from "native-base"
import React, { useEffect, useState } from "react"
import { Countdown, EventsTime } from "../interfaces/Events"
import TimerNumber from "./TimerNumber"

const CountdownTimer = () => {
	const [time, setTime] = useState<Countdown>({
		hours: 0,
		minutes: 0,
		seconds: 0,
		days: 0
	})

	// Weekday goes from 0 to 6
	const events: EventsTime[] = [
		{
			id: 0,
			hour: 17,
			minutes: 0,
			day: "Monday",
			index: 1
		},
		{
			id: 1,
			hour: 2,
			minutes: 37,
			day: "Thursday",
			index: 4
		},
		{
			id: 2,
			hour: 14,
			minutes: 54,
			day: "Saturday",
			index: 6
		}
	]

	const nextDayAndTime = (dayOfWeek: number, hour: number, minute: number) => {
		const todaysDate = new Date()
		// Get the next specified day from today
		const result = new Date(
			todaysDate.getFullYear(),
			todaysDate.getMonth(),
			todaysDate.getDate() + ((7 + dayOfWeek - todaysDate.getDay()) % 7),
			hour,
			minute
		)
		if (result < todaysDate) result.setDate(result.getDate() + 7)

		return result
	}

	const getNearestDay = () => {
		const nextEventsDate = events.map((event) => nextDayAndTime(event.index, event.hour, event.minutes)).sort((a, b) => a.getTime() - b.getTime())
		const nearestEventDate = nextEventsDate[0]

		return nearestEventDate
	}

	const getDifferenceBetweenDates = () => {
		const todaysDate = new Date()
		const nextEventDate = getNearestDay()
		const difference = nextEventDate.getTime() - todaysDate.getTime()
		const differenceDate = new Date(difference)
		const seconds = differenceDate.getSeconds()
		const minutes = differenceDate.getMinutes()
		const hours = differenceDate.getHours()
		const days = Math.round(difference / (1000 * 3600 * 24))

		return {
			days,
			hours,
			minutes,
			seconds
		}
	}

	useEffect(() => {
		const timerId = setInterval(() => setTime(getDifferenceBetweenDates()), 1000)
		return () => clearInterval(timerId)
	})

	return (
		<Center mt="10">
			<Flex flexDir="row" alignItems="center">
				{Object.entries(time).map((obj, index) => (
					<Flex flexDir="row" key={obj[0]}>
						<TimerNumber title={obj[0]} timer={obj[1]} />
						{index !== 3 && (
							<Text py="2" px="3" fontSize={"3xl"} fontWeight="bold">
								:
							</Text>
						)}
					</Flex>
				))}
			</Flex>
		</Center>
	)
}

export default CountdownTimer
