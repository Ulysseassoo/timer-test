import { Box, Center, Image, NativeBaseProvider, Text } from "native-base"
import React from "react"
import CountdownTimer from "./src/components/CountdownTimer"

export default function App() {
	return (
		<NativeBaseProvider>
			<Box flex="1" bg="green.600" safeArea>
				<Box flex="1">
					<Center mt="16">
						<Text px="4" textAlign={"center"} fontSize="3xl" color="white">
							Hello 👋 ! You have...
						</Text>
					</Center>
					<CountdownTimer />
					<Center>
						<Text fontSize={"md"} mt="4" opacity="0.8">
							Before the event starts.
						</Text>
					</Center>
				</Box>

				<Center>
					<Image source={require("./assets/boy.png")} height="400" width="400" alt="boy" />
				</Center>
			</Box>
		</NativeBaseProvider>
	)
}
