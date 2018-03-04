import React, { Component }  from 'react';
import { AsyncStorage, Platform, StyleSheet, View, Image, ScrollView, Alert } from 'react-native';
import { Container, Content, Button, Text, List, ListItem, Left, Right, Body, Tabs, Tab, ScrollableTab, Spinner, Form, Item, Input } from 'native-base';
import RNShakeEvent from 'react-native-shake-event';
import { randomCharacter } from '../../lib/RandomCharacter';
import LabelAndContent from '../LabelAndContent/LabelAndContent';
import Header from '../Header/Header';
import styles from '../../Styles';

export default class RandomCharacterScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			character: null
		}

		this.onNameChange = this._onNameChange.bind(this);
		this.save = this._save.bind(this);
		this.reRoll = this._reRoll.bind(this);
	}

	componentWillMount() {
		RNShakeEvent.addEventListener('shake', () => {
			this._reRoll();
		});
	}

	async componentDidMount() {
	    let hero = await AsyncStorage.getItem('hero');

	    if (hero === null) {
	        this.setState({character: randomCharacter.generate()});
	    } else {
	        this.setState({character: JSON.parse(hero)});
	    }
	}

	componentWillUnmount() {
		RNShakeEvent.removeEventListener('shake');
	}

	_onNameChange(text) {
	    let character = {...this.state.character};
	    character.name = text;

	    this.setState({character: character});
	}

	_reRoll() {
		this.setState({
			character: randomCharacter.generate()
		});
	}

    _save() {
        AsyncStorage.setItem('hero', JSON.stringify(this.state.character));
    }

	_renderCharacteristics() {
		let elements = [];
		
		for (let prop in this.state.character.archtype.characteristics) {
			elements.push(
				<ListItem key={prop}>
	        		<Left>
	        			<Text style={styles.boldGrey}>{this.state.character.archtype.characteristics[prop]}</Text>
	        		</Left>
	        		<Body>
	        			<Text style={styles.grey}>{prop.toUpperCase()}</Text>
	        		</Body>
	        	</ListItem>
			);
		}
		
		return (
			<View>
				{elements.map((element, index) => {
					return element;
				})}
			</View>
		);
	}
		
	render() {
	    if (this.state.character === null) {
            return (
                <Container style={localStyles.container}>
                    <Header hasTabs={false} navigation={this.props.navigation} />
                    <Content style={{backgroundColor: '#375476', paddingTop: 10}}>
                        <Spinner color='#D0D1D3' />
                    </Content>
	            </Container>
	        );
	    }

		return (
		  <Container style={localStyles.container}>
		  	<Header hasTabs={false} navigation={this.props.navigation} />
		  	<Content style={{backgroundColor: '#375476', paddingTop: Platform.OS === 'ios' ? 0 : 10}}>
			  	<Tabs tabBarUnderlineStyle={localStyles.tabBarUnderline} renderTabBar={()=> <ScrollableTab />}>
			  		<Tab tabStyle={localStyles.tabInactive} activeTabStyle={localStyles.tabActive} textStyle={styles.grey} activeTextStyle={{color: '#FFF'}} heading="General">
			  			<ScrollView style={localStyles.tabContent}>
			  			    <List>
                                <ListItem>
                                    <Left>
                                        <Text style={styles.boldGrey}>Name:</Text>
                                    </Left>
                                    <Body>
                                        <Form>
                                            <Item>
                                                <Input
                                                    style={{borderColor: '#D0D1D3', color: '#D0D1D3'}}
                                                    onChangeText={(text) => this.onNameChange(text)}
                                                    value={this.state.character.name}
                                                />
                                            </Item>
                                        </Form>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <Left>
                                        <Text style={styles.boldGrey}>Archetype:</Text>
                                    </Left>
                                    <Body>
                                        <Text style={styles.grey}>{this.state.character.archtype.name}</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <Left>
                                        <Text style={styles.boldGrey}>Gender:</Text>
                                    </Left>
                                    <Body>
                                        <Text style={styles.grey}>{this.state.character.gender}</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <Left>
                                        <Text style={styles.boldGrey}>Special FX:</Text>
                                    </Left>
                                    <Body>
                                        <Text style={styles.grey}>{this.state.character.specialFx}</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <Left>
                                        <Text style={styles.boldGrey}>Profession:</Text>
                                    </Left>
                                    <Body>
                                        <Text style={styles.grey}>{this.state.character.skills.profession}</Text>
                                    </Body>
                                </ListItem>
                            </List>
                            <View style={{paddingBottom: 20}} />
                            <Text style={[styles.boldGrey, localStyles.pointCostsHeader]}>Point Costs</Text>
                            <List>
                                <ListItem>
                                    <Left>
                                        <Text style={styles.boldGrey}>Characteristics:</Text>
                                    </Left>
                                    <Body>
                                        <Text style={styles.grey}>{this.state.character.archtype.characteristicsCost}</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <Left>
                                        <Text style={styles.boldGrey}>Powers:</Text>
                                    </Left>
                                    <Body>
                                        <Text style={styles.grey}>{this.state.character.powers.powersCost}</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <Left>
                                        <Text style={styles.boldGrey}>Skills:</Text>
                                    </Left>
                                    <Body>
                                        <Text style={styles.grey}>{this.state.character.skills.cost}</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <Left>
                                        <Text style={styles.boldGrey}>Disadvantages:</Text>
                                    </Left>
                                    <Body>
                                        <Text style={styles.grey}>{this.state.character.disadvantages.disadvantagesCost}</Text>
                                    </Body>
                                </ListItem>
				            </List>
                            <View style={{paddingBottom: 20}} />
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 20}}>
                                <View style={styles.buttonContainer}>
                                    <Button style={styles.button} onPress={() => this.save()}>
                                        <Text uppercase={false} style={styles.buttonText}>Save</Text>
                                    </Button>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button block style={styles.button} onPress={this.reRoll}>
                                        <Text uppercase={false}>Roll Again</Text>
                                    </Button>
                                </View>
                            </View>
			    		</ScrollView>
			  		</Tab>
			  		<Tab tabStyle={localStyles.tabInactive} activeTabStyle={localStyles.tabActive} textStyle={styles.grey} activeTextStyle={{color: '#FFF'}} heading="Characteristics">
			  			<ScrollView style={localStyles.tabContent}>
			  				{this._renderCharacteristics()}
			  			</ScrollView>
			  		</Tab>
			  		<Tab tabStyle={localStyles.tabInactive} activeTabStyle={localStyles.tabActive} textStyle={styles.grey} activeTextStyle={{color: '#FFF'}} heading="Powers">
			  			<ScrollView style={localStyles.tabContent}>
					  		{this.state.character.powers.powers.map((power, index) => {
								return (
									<ListItem key={'power-' + index}>
						        		<Left>
						        			<Text style={styles.grey}>{power.power}</Text>
						        		</Left>
						        		<Right>
						        			<Text style={styles.grey}>{power.cost}</Text>
						        		</Right>
						        	</ListItem>							
								);
							})}
				  		</ScrollView>
			  		</Tab>
			  		<Tab tabStyle={localStyles.tabInactive} activeTabStyle={localStyles.tabActive} textStyle={styles.grey} activeTextStyle={{color: '#FFF'}} heading="Skills">
			  			<ScrollView style={localStyles.tabContent}>
					  		{this.state.character.skills.skills.map((skill, index) => {
								return (
									<ListItem key={'skill-' + index}>
						        		<Body>
						        			<Text style={styles.grey}>{skill}</Text>
						        		</Body>
						        	</ListItem>
								);
							})}
				  		</ScrollView>
			  		</Tab>
			  		<Tab tabStyle={localStyles.tabInactive} activeTabStyle={localStyles.tabActive} textStyle={styles.grey} activeTextStyle={{color: '#FFF'}} heading="Disadvantages">
			  			<ScrollView style={localStyles.tabContent}>
					  		{this.state.character.disadvantages.disadvantages.map((disad, index) => {
								return (
									<ListItem key={'disad-' + index}>
						        		<Left>
						        			<Text style={styles.grey}>{disad.description}</Text>
						        		</Left>
						        		<Right>
						        			<Text style={styles.grey}>{disad.cost}</Text>
						        		</Right>
						        	</ListItem>							
								);
							})}
				  		</ScrollView>
			  		</Tab>
			  	</Tabs>
		  	</Content>
	      </Container>	
		);
	}
}

const localStyles = StyleSheet.create({
	tabInactive: {
		backgroundColor: '#3a557f'
	},
	tabActive: {
		backgroundColor: '#476ead'
	},
	tabBarUnderline: {
		backgroundColor: '#3da0ff'
	},
	tabContent: {
		backgroundColor: '#375476'
	},
	pointCostsHeader: {
		alignSelf: 'center',
		textDecorationLine: 'underline'
	}
});
