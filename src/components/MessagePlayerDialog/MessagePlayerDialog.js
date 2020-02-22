import React, { Component }  from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, View, ScrollView } from 'react-native';
import { Container, Content, Button, Text,Textarea } from 'native-base';
import Modal from 'react-native-modal';
import { verticalScale } from 'react-native-size-matters';
import styles from '../../Styles';
import Heading from '../Heading/Heading';

export default class MessagePlayerDialog extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        recipient: PropTypes.string.isRequired,
        onSend: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            message: ''
        };
    }

    render() {
        return (
            <Modal
                isVisible={this.props.visible}
                onBackButtonPress={() => this.props.onClose()}
                onBackdropPress={() => this.props.onClose()}
                scrollTo={this._handleScrollTo}
                scrollOffsetMax={300 - 200}
            >
                <View style={styles.modal}>
                    <Text style={styles.modalHeader}>Message {this.props.recipient}</Text>
                    <View style={[styles.modalContent, {minHeight: verticalScale(170)}]}>
                        <Textarea
                            style={[styles.grey, {borderWidth: 0.5, borderColor: '#303030'}]}
                            rowSpan={4}
                            value={this.state.message}
                            onChangeText={(value) => this.setState({message: value})}
                        />
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                            <View style={styles.buttonContainer}>
                                <Button style={styles.button}  onPress={() => this.props.onSend(this.state.message)}>
                                    <Text uppercase={false} style={styles.buttonText}>Send</Text>
                                </Button>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button style={styles.button}  onPress={() => this.props.onClose()}>
                                    <Text uppercase={false} style={styles.buttonText}>Cancel</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}