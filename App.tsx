import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { EventsTime } from "./src/interfaces/Events"

export default function App() {
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
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
			seconds,
			minutes,
			hours,
			days
		}
	}

	console.log(getDifferenceBetweenDates())

	return (
		<View style={styles.container}>
			<Text>Open up App.tsx to start working on your app!</Text>
			<StatusBar style="auto" />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
})
