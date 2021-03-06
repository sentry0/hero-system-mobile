import { Alert } from 'react-native';
import CharacterTrait from './CharacterTrait';
import { common } from '../lib/Common';

// Copyright 2018-Present Philip J. Guinchard
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export default class EffectRoll extends CharacterTrait {
    constructor(characterTrait, rollType) {
        super(characterTrait.trait, characterTrait.listKey, characterTrait.getCharacter);

        this.characterTrait = characterTrait;
        this.rollType = rollType;
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
        return this.characterTrait.attributes();
    }

    definition() {
        return this.characterTrait.definition();
    }

    roll() {
        const baseDice = this.characterTrait.trait.levels;
        const partialDie = this._getPartialDie(this.characterTrait.trait.adder);
        let roll = `${baseDice}d6`;

        if (partialDie === '½') {
            roll = `${baseDice}${partialDie}d6`;
        } else if (partialDie === '1') {
            roll = `${baseDice}d6+${partialDie}`;
        } else if (partialDie === '-1') {
            roll = `${baseDice + 1}d6${partialDie}`;
        }

        return {
            roll: roll,
            type: this.rollType,
        };
    }

    advantages() {
        return this.characterTrait.advantages();
    }

    limitations() {
        return this.characterTrait.limitations();
    }

    _getPartialDie(adder) {
        let partialDie = null;

        if (adder === undefined || adder === null) {
            return partialDie;
        }

        if (Array.isArray(adder)) {
            for (let a of adder) {
                partialDie = this._getPartialDie(a);

                if (partialDie !== null) {
                    break;
                }
            }
        } else {
            if (adder.xmlid === 'PLUSONEHALFDIE') {
                partialDie = '½';
            } else if (adder.xmlid.toUpperCase() === 'PLUSONEPIP') {
                partialDie = '1';
            } else if (adder.xmlid.toUpperCase() === 'MINUSONEPIP') {
                partialDie = '-1';
            }
        }

        return partialDie;
    }
}
