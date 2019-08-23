import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Platform, StyleSheet, View, ScrollView, Alert } from 'react-native';
import { Container, Content, Toast, Tabs, Tab, ScrollableTab, Spinner, Text } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import CharacterTrait from '../../decorators/CharacterTrait';
import Skill from '../../decorators/Skill';
import BaseCost from '../../decorators/BaseCost';
import Modifier from '../../decorators/Modifier';
import General from '../HeroDesignerCharacter/General';
import Characteristics from '../HeroDesignerCharacter/Characteristics';
import Traits from '../HeroDesignerCharacter/Traits';
import Header from '../Header/Header';
import Slider from '../Slider/Slider';
import { character } from '../../lib/Character';
import styles from '../../Styles';

class ViewHeroDesignerCharacterScreen extends Component {
	static propTypes = {
		character: PropTypes.object.isRequired
	}

    constructor(props) {
        super(props);

        this.skillDecorator = this._skillDecorator.bind(this);
        this.perkDecorator = this._perkDecorator.bind(this);
        this.talentDecorator = this._talentDecorator.bind(this);
        this.martialArtsDecorator = this._martialArtsDecorator.bind(this);
        this.powersDecorator = this._powersDecorator.bind(this);
        this.complicationsDecorator = this._complicationsDecorator.bind(this);
    }

    _skillDecorator(skill, skills) {
        let decorated = new CharacterTrait(skill, this._getParent(skill, skills));
        decorated = new Skill(decorated);
        decorated = new Modifier(decorated);

        return decorated;
    }

    _perkDecorator(perk, perks) {
        let decorated = new CharacterTrait(perk, this._getParent(perk, perks));
        decorated = new BaseCost(decorated);
        decorated = new Modifier(decorated);

        return decorated;
    }

    _talentDecorator(talent, talents) {
        let decorated = new CharacterTrait(talent, this._getParent(talent, talents));
        decorated = new BaseCost(decorated);
        decorated = new Modifier(decorated);

        return decorated;
    }

    _martialArtsDecorator(maneuver, martialArts) {
        let decorated = new CharacterTrait(maneuver, this._getParent(maneuver, martialArts));
        decorated = new BaseCost(decorated);
        decorated = new Modifier(decorated);

        return decorated;
    }

    _powersDecorator(power, powers) {
        let decorated = new CharacterTrait(power, this._getParent(power, powers));
        decorated = new BaseCost(decorated);
        decorated = new Modifier(decorated);

        return decorated;
    }

    _complicationsDecorator(complication, complications) {
        let decorated = new CharacterTrait(complication, this._getParent(complication, complications));
        decorated = new BaseCost(decorated);
        decorated = new Modifier(decorated);

        return decorated;
    }

    _getParent(item, items) {
        let parent = undefined;

        if (item.parentid === undefined || items === undefined) {
            return parent;
        }

        for (let i of items) {
            if (i.id === item.parentid) {
                parent = i;
                break;
            }
        }

        return parent;
    }

	render() {
		if (character === null) {
			return null;
		}

		return (
		  <Container style={styles.container}>
		  	<Header hasTabs={false} navigation={this.props.navigation} />
		  	<Content scrollEnable={false} style={styles.content}>
                <Tabs tabBarUnderlineStyle={styles.tabBarUnderline} renderTabBar={()=> <ScrollableTab style={{backgroundColor: '#000'}} />}>
			  		<Tab tabStyle={styles.tabInactive} activeTabStyle={styles.tabActive} textStyle={styles.grey} activeTextStyle={{color: '#FFF'}} heading="General">
			  			<View style={styles.tabContent}>
                            <General characterInfo={this.props.character.characterInfo} />
			  			</View>
			  		</Tab>
					<Tab tabStyle={styles.tabInactive} activeTabStyle={styles.tabActive} textStyle={styles.grey} activeTextStyle={{color: '#FFF'}} heading="Characteristics">
						<View style={styles.tabContent}>
							<Characteristics navigation={this.props.navigation} characteristics={this.props.character.characteristics} movement={this.props.character.movement} />
						</View>
					</Tab>
					<Tab tabStyle={styles.tabInactive} activeTabStyle={styles.tabActive} textStyle={styles.grey} activeTextStyle={{color: '#FFF'}} heading="Skills">
						<View style={styles.tabContent}>
							<Traits
							    navigation={this.props.navigation}
							    headingText='Skills'
							    itemName='skills'
							    items={this.props.character.skills}
							    decorateTrait={this.skillDecorator}
							/>
						</View>
					</Tab>
					<Tab tabStyle={styles.tabInactive} activeTabStyle={styles.tabActive} textStyle={styles.grey} activeTextStyle={{color: '#FFF'}} heading="Perks">
						<View style={styles.tabContent}>
							<Traits
							    navigation={this.props.navigation}
							    headingText='Perks'
							    itemName='perks'
							    items={this.props.character.perks}
							    decorateTrait={this.perkDecorator}
							/>
						</View>
					</Tab>
					<Tab tabStyle={styles.tabInactive} activeTabStyle={styles.tabActive} textStyle={styles.grey} activeTextStyle={{color: '#FFF'}} heading="Talents">
						<View style={styles.tabContent}>
							<Traits
							    navigation={this.props.navigation}
							    headingText='Talents'
							    itemName='talents'
							    items={this.props.character.talents}
							    decorateTrait={this.talentDecorator}
							/>
						</View>
					</Tab>
					<Tab tabStyle={styles.tabInactive} activeTabStyle={styles.tabActive} textStyle={styles.grey} activeTextStyle={{color: '#FFF'}} heading="Martial Arts">
						<View style={styles.tabContent}>
							<Traits
							    navigation={this.props.navigation}
							    headingText='Martial Arts'
							    itemName='maneuver'
							    items={this.props.character.martialArts}
							    decorateTrait={this.martialArtsDecorator}
							/>
						</View>
					</Tab>
					<Tab tabStyle={styles.tabInactive} activeTabStyle={styles.tabActive} textStyle={styles.grey} activeTextStyle={{color: '#FFF'}} heading="Powers">
						<View style={styles.tabContent}>
							<Traits
							    navigation={this.props.navigation}
							    headingText='Powers'
							    itemName='powers'
							    items={this.props.character.powers}
							    decorateTrait={this.powersDecorator}
							/>
						</View>
					</Tab>
					<Tab tabStyle={styles.tabInactive} activeTabStyle={styles.tabActive} textStyle={styles.grey} activeTextStyle={{color: '#FFF'}} heading="Complications">
						<View style={styles.tabContent}>
							<Traits
							    navigation={this.props.navigation}
							    headingText='Complications'
							    itemName='disadvantages'
							    items={this.props.character.disadvantages}
							    decorateTrait={this.complicationsDecorator}
							/>
						</View>
					</Tab>
			  	</Tabs>
		  	</Content>
	      </Container>
		);
	}
}

const localStyles = StyleSheet.create({
	pointCostsHeader: {
		alignSelf: 'center',
		textDecorationLine: 'underline'
	},
    button: {
        backgroundColor: '#478f79',
        alignSelf: 'flex-end'
    }
});

const mapStateToProps = state => {
    return {
        character: state.character
    };
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ViewHeroDesignerCharacterScreen);
