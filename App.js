import React, { Component }  from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import Expo from 'expo';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Root } from "native-base";
import HomeScreen from './src/components/Screens/HomeScreen';
import RandomCharacterScreen from './src/components/Screens/RandomCharacterScreen';
import ResultScreen from './src/components/Screens/ResultScreen';
import HitScreen from './src/components/Screens/HitScreen';
import DamageScreen from './src/components/Screens/DamageScreen';
import FreeFormScreen from './src/components/Screens/FreeFormScreen';
import SettingsScreen from './src/components/Screens/SettingsScreen';
import Sidebar from './src/components/Sidebar/Sidebar';

const RootStack = DrawerNavigator({
		Home: {
			screen: HomeScreen,
		},
		RandomCharacter: {
			screen: RandomCharacterScreen
		},
		Result: {
			screen: ResultScreen
		}, 
		Hit: {
			screen: HitScreen
		}, 
		Damage: {
			screen: DamageScreen
		}, 
		FreeForm: {
			screen: FreeFormScreen
		},
		Settings: {
			screen: SettingsScreen
		}
	}, {
		initialRouteName: 'Home',
		drawerPosition: 'right',
		contentComponent: props => <Sidebar {...props} />
	}
);

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fontsLoaded: false
		}
	}
	
	async componentWillMount() {
		await Expo.Font.loadAsync({
			'Roboto': require('native-base/Fonts/Roboto.ttf'),
			'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
		});

		this.setState({
			fontsLoaded: true
		});
	}

	render() {
		if (!this.state.fontsLoaded) {
			return <Expo.AppLoading />;
		}

		return (
			<Root>
				<RootStack />
			</Root>	
		);
	}
}