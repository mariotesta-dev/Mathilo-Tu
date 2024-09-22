import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	ActivityIndicator,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import BackBtn from "../components/BackBtn";
import pencil from "../assets/pencil.png";
import ModalEditScenario from "../components/ModalEditScenario";
import add from "../assets/add.png";

import { useSelector, useDispatch } from "react-redux";
import { saveScenarios } from "../redux/action";

const Selection = ({ navigation, route }) => {
	const isFocused = useIsFocused();
	const reduxScenarios = useSelector((state) => state.scenarios);
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [currentScenarios, setCurrentScenarios] = useState(
		reduxScenarios || []
	);

	const handleSaveScenarios = (scenarios = currentScenarios) => {
		dispatch(saveScenarios(scenarios));
	};

	useEffect(() => {
		handleSaveScenarios();
	}, [currentScenarios]);

	return (
		<View style={styles.homeContainer}>
			<BackBtn navigation={navigation} />
			<View style={styles.btnList}>
				<TouchableOpacity
					style={styles.primaryBtn}
					onPressIn={() => setLoading(true)}
					onPressOut={() => {
						setLoading(false);
						navigation.navigate("SetUpScene", {
							currentScenarios: currentScenarios,
							setCurrentScenarios: setCurrentScenarios,
						});
					}}>
					{!loading ? (
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								width: "72%",
								justifyContent: "space-around",
								alignItems: "center",
							}}>
							<View
								style={{
									borderColor: "white",
									borderWidth: 3,
									borderRadius: 20,
									padding: 2,
								}}>
								<Image
									source={add}
									style={{
										height: 12,
										width: 12,
									}}
								/>
							</View>
							<Text style={styles.primaryBtnText}>New Scenario</Text>
						</View>
					) : (
						<ActivityIndicator color="#000" />
					)}
				</TouchableOpacity>
				<View style={styles.savedList}>
					<Text style={styles.savedText}>Your saved scenarios</Text>
					{currentScenarios.length > 0 ? (
						currentScenarios.map((scenario, key) => {
							return (
								<SavedScenario
									key={scenario.id}
									scenario={scenario}
									currentScenarios={currentScenarios}
									setCurrentScenarios={setCurrentScenarios}
									navigation={navigation}
									handleSaveScenarios={handleSaveScenarios}></SavedScenario>
							);
						})
					) : (
						<View>
							<Text style={{ color: "rgba(0,0,0,0.1)", textAlign: "center" }}>
								.
							</Text>
							<Text style={{ color: "rgba(0,0,0,0.2)", textAlign: "center" }}>
								.
							</Text>
							<Text style={{ color: "rgba(0,0,0,0.4)", textAlign: "center" }}>
								.
							</Text>
							<Text
								style={{
									color: "rgba(0,0,0,0.4)",
									textAlign: "center",
								}}></Text>
							<Text style={{ color: "rgba(0,0,0,0.4)", textAlign: "center" }}>
								You haven't saved any scenario.
							</Text>
							<Text style={{ color: "rgba(0,0,0,0.4)", textAlign: "center" }}>
								Create a new one to start.
							</Text>
							<Text style={{ color: "rgba(0,0,0,0.4)", textAlign: "center" }}>
								.
							</Text>
							<Text style={{ color: "rgba(0,0,0,0.4)", textAlign: "center" }}>
								.
							</Text>
							<Text style={{ color: "rgba(0,0,0,0.2)", textAlign: "center" }}>
								.
							</Text>
							<Text
								style={{
									color: "rgba(0,0,0,0.1)",
									textAlign: "center",
								}}></Text>
						</View>
					)}
				</View>
			</View>
		</View>
	);
};

const SavedScenario = ({
	navigation,
	scenario,
	currentScenarios,
	setCurrentScenarios,
	handleSaveScenarios,
}) => {
	const [showEditWindow, setShowEditWindow] = useState(false);
	const [name, setName] = useState(scenario.title);
	const [loading, setLoading] = useState(false);

	return (
		<View style={{ position: "relative" }}>
			<ModalEditScenario
				name={name}
				setName={setName}
				modalVisible={showEditWindow}
				setModalVisible={setShowEditWindow}
				id={scenario.id}
				currentScenarios={currentScenarios}
				setCurrentScenarios={setCurrentScenarios}
				handleSaveScenarios={handleSaveScenarios}
				scenario={scenario}
			/>
			<TouchableOpacity
				style={styles.edit}
				onPress={() => {
					setShowEditWindow(!showEditWindow);
				}}>
				<Image source={pencil} style={styles.img} />
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.secondaryBtn}
				onPressIn={() => setLoading(true)}
				onPressOut={() => {
					navigation.navigate("Scene", {
						isNewScenario: false,
						id: scenario.id,
						name: name,
						environment: scenario.environment,
						category: scenario.category,
						objects: scenario.objects,
						currentScenarios: currentScenarios,
						setCurrentScenarios: setCurrentScenarios,
					});
					setLoading(false);
				}}>
				{!loading ? (
					<Text style={styles.secondaryBtnText}>{name}</Text>
				) : (
					<ActivityIndicator color="#000" />
				)}
			</TouchableOpacity>
		</View>
	);
};

var styles = StyleSheet.create({
	homeContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fffaee",
	},
	title: {
		fontSize: 60,
		fontWeight: "bold",
	},
	btnList: {
		display: "flex",
		flexDirection: "column",
		marginTop: 50,
		alignItems: "center",
	},
	savedList: {
		display: "flex",
		flexDirection: "column",
		marginTop: 20,
		alignItems: "center",
		maxHeight: 230,
	},
	savedText: {
		marginBottom: 20,
		fontSize: 14,
		fontWeight: "bold",
		color: "#464646",
	},
	primaryBtn: {
		alignItems: "center",
		justifyContent: "center",
		height: 55,
		width: 245,
		borderRadius: 16,
		backgroundColor: "rgba(10,173,33,1)",
		borderWidth: 3,
		marginBottom: 20,
		shadowColor: "black",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 1,
		shadowRadius: 0.5,
	},
	primaryBtn2: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 50,
		borderRadius: 16,
		backgroundColor: "#464646",
		borderWidth: 3,
		marginBottom: 20,
		shadowColor: "black",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 1,
		shadowRadius: 0.5,
	},
	primaryBtnText: {
		fontSize: 22,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "white",
	},
	secondaryBtn: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 30,
		width: 190,
		borderRadius: 15,
		elevation: 3,
		backgroundColor: "white",
		borderWidth: 3,
		marginBottom: 20,
		shadowColor: "black",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 1,
		shadowRadius: 0.5,
	},
	secondaryBtnText: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "black",
	},
	edit: {
		position: "absolute",
		top: -10,
		right: -10,
		height: 30,
		width: 30,
		backgroundColor: "white",
		borderWidth: 2,
		borderRadius: 15,
		zIndex: 1,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	img: {
		height: 18,
		width: 18,
	},
});

export default Selection;
