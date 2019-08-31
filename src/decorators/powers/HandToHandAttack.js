import { Alert } from 'react-native';
import CharacterTrait from '../CharacterTrait';
import { common } from '../../lib/Common';

export default class HandToHandAttack extends CharacterTrait {
    constructor(characterTrait) {
        super(characterTrait.trait, characterTrait.listKey, characterTrait.getCharacter);

        this.characterTrait = characterTrait;
    }

    cost() {
        return this.characterTrait.cost();
    }

    costMultiplier() {
        return this.characterTrait.costMultiplier();
    }

    activeCost() {
        return this.characterTrait.activeCost();
    }

    realCost() {
        return this.characterTrait.realCost();
    }

    label() {
        return this.characterTrait.label();
    }

    attributes() {
        let attributes = this.characterTrait.attributes();

        attributes.push({
            label: this._getDice(),
            value: ''
        });

        return attributes;
    }

    definition() {
        return this.characterTrait.definition();
    }

    roll() {
        let character = this.characterTrait.getCharacter();
        let characteristicsMap = common.toMap(character.characteristics, 'shortName');
        let adderMap = common.toMap(this.characterTrait.trait.adder);
        let dice = this.characterTrait.trait.levels;
        let partialDie = 0;

        dice += characteristicsMap.get('STR').value / 5;

        if ((dice % 1).toFixed() !== '0.0') {
            partialDie = 2;
            dice = Math.trunc(dice);
        }

        if (adderMap.has('PLUSONEPIP')) {
            partialDie += 1;
        } else if (adderMap.has('PLUSONEHALFDIE')) {
            partialDie += 2;
        }

        if (partialDie === 1) {
            return `${dice}d6+1`;
        } else if (partialDie === 2) {
            return `${dice}½d6`;
        } else if (partialDie === 3) {
            return `${dice + 1}d6`;
        } else if (partialDie === 4) {
            return `${dice + 1}d6+1`;
        }

        return `${dice}d6`;
    }

    advantages() {
        return this.characterTrait.advantages();
    }

    limitations() {
        return this.characterTrait.limitations();
    }

    _getDice() {
        let dice = `+${this.characterTrait.trait.levels}`;
        let adderMap = common.toMap(this.characterTrait.trait.adder);

        if (adderMap.has()) {
            dice += '½d6';
        } else if (adderMap.has()) {
            dice += 'd6+1';
        } else {
            dice += 'd6';
        }

        return dice;
    }
}