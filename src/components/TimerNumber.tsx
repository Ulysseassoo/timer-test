import { VStack, HStack, Text } from "native-base"
import React from "react"

interface Props {
	timer: number
	title: string
}

const TimerNumber = ({ timer, title }: Props) => {
	const roundDigits = (number: number) => {
		return (number < 10 ? "0" : "") + number
	}

	const timerFormatted = roundDigits(timer).toString().split("")
	return (
		<VStack space="2" alignItems="center">
			<HStack space="1">
				<Text fontWeight={"bold"} py="3" px="2" borderRadius={"xl"} bg="green.700" color="black" fontSize={"2xl"}>
					{timerFormatted[0]}
				</Text>
				<Text fontWeight={"bold"} py="3" px="2" borderRadius={"xl"} bg="green.700" color="black" fontSize={"2xl"}>
					{timerFormatted[1]}
				</Text>
			</HStack>
			<Text fontSize={"md"} opacity="0.8">
				{title}
			</Text>
		</VStack>
	)
}

export default TimerNumber
