import React, { Component }  from 'react';
import { AsyncStorage, View } from 'react-native';
import { Container, Content, Text, List, ListItem, Left, Right, Spinner } from 'native-base';
import Header from '../Header/Header';
import { statistics } from '../../lib/Statistics';
import styles from '../../Styles';

export default class StatisticsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stats: null
        }
    }

    async componentDidMount() {
        let stats = await AsyncStorage.getItem('statistics');

        this.setState({
            stats: JSON.parse(stats)
        })
    }

    _renderHitLocationStat() {
        let mostFrequentHitLocation = statistics.getMostFrequentHitLocation(this.state.stats.totals.hitLocations);

        if (mostFrequentHitLocation.location === '') {
            return <Text style={styles.grey}>-</Text>;
        }

        return <Text style={styles.grey}>{mostFrequentHitLocation.location} ({mostFrequentHitLocation.hits}x)</Text>;
    }

    _renderAverageRoll() {
        if (this.state.stats.totals.diceRolled === 0) {
            return <Text style={styles.grey}>-</Text>;
        }

        return (
            <Text style={styles.grey}>
                {(this.state.stats.sum / this.state.stats.totals.diceRolled).toFixed(1)}
            </Text>
        );
    }

	render() {
        if (this.state.stats === null) {
            return (
                <Container style={styles.container}>
                    <Header hasTabs={false} navigation={this.props.navigation} />
                    <Content style={{backgroundColor: '#375476', paddingTop: 10}}>
                        <Spinner color='#D0D1D3' />
                    </Content>
                </Container>
            );
        }

		return (
		  <Container style={styles.container}>
			<Header navigation={this.props.navigation} />
	        <Content style={styles.content}>
	            <Text style={styles.heading}>Statistics</Text>
	            <List>
                    <ListItem>
                      <Left>
                        <Text style={styles.boldGrey}>Total Dice Rolled:*</Text>
                      </Left>
                      <Right>
                        <Text style={styles.grey}>{this.state.stats.totals.diceRolled}</Text>
                      </Right>
                    </ListItem>
                    <ListItem>
                      <Left>
                        <Text style={styles.boldGrey}>Total Face Value:</Text>
                      </Left>
                      <Right>
                        <Text style={styles.grey}>{this.state.stats.sum}</Text>
                      </Right>
                    </ListItem>
                    <ListItem>
                      <Left>
                        <Text style={styles.boldGrey}>Total Skill Checks:</Text>
                      </Left>
                      <Right>
                        <Text style={styles.grey}>{this.state.stats.totals.skillChecks}</Text>
                      </Right>
                    </ListItem>
                    <ListItem>
                      <Left>
                        <Text style={styles.boldGrey}>Total Rolls To Hit:</Text>
                      </Left>
                      <Right>
                        <Text style={styles.grey}>{this.state.stats.totals.hitRolls}</Text>
                      </Right>
                    </ListItem>
                    <ListItem>
                      <Left>
                        <Text style={styles.boldGrey}>Total Damage Rolls:</Text>
                      </Left>
                      <Right>
                        <Text style={styles.grey}>{this.state.stats.totals.normalDamage.rolls + this.state.stats.totals.killingDamage.rolls}</Text>
                      </Right>
                    </ListItem>
                    <ListItem>
                      <Left>
                        <Text style={styles.boldGrey}>Total Free Form Rolls:</Text>
                      </Left>
                      <Right>
                        <Text style={styles.grey}>{this.state.stats.totals.freeFormRolls}</Text>
                      </Right>
                    </ListItem>
                    <ListItem>
                      <Left>
                        <Text style={styles.boldGrey}>Total Stun:</Text>
                      </Left>
                      <Right>
                        <Text style={styles.grey}>{this.state.stats.totals.normalDamage.stun + this.state.stats.totals.killingDamage.stun}</Text>
                      </Right>
                    </ListItem>
                    <ListItem>
                      <Left>
                        <Text style={styles.boldGrey}>Total Body:</Text>
                      </Left>
                      <Right>
                        <Text style={styles.grey}>{this.state.stats.totals.normalDamage.body + this.state.stats.totals.killingDamage.body}</Text>
                      </Right>
                    </ListItem>
                    <ListItem>
                      <Left>
                        <Text style={styles.boldGrey}>Total Knockback:</Text>
                      </Left>
                      <Right>
                        <Text style={styles.grey}>{this.state.stats.totals.knockback}m</Text>
                      </Right>
                    </ListItem>
                    <ListItem>
                      <Left>
                        <Text style={styles.boldGrey}>Most frequent hit location:</Text>
                      </Left>
                      <Right>
                        {this._renderHitLocationStat()}
                      </Right>
                    </ListItem>
                    <ListItem>
                      <Left>
                        <Text style={styles.boldGrey}>Average Roll:</Text>
                      </Left>
                      <Right>
                        {this._renderAverageRoll()}
                      </Right>
                    </ListItem>
                    <Text style={[styles.grey, {fontStyle: 'italic', paddingBottom: 30, paddingLeft: 30}]}>*Does not include hit location or knockback rolls</Text>
	            </List>
	        </Content>
	      </Container>
		);
	}
}