import React from 'react';
import {
    Button,
    StyleSheet,
} from 'react-native';
import theme from '../theme'

// ...props is a way to pass down all of the attributes that was used to call <PrimaryButton>
    // example:  <PrimaryButton title="Create New Account" onPress={() => this.gotoRegister()}/>
    // ...props will automatically insert "title='Create New Account'", into the Button
const PrimaryButton = ({...props}) => (
    <Button color={theme.primaryColor} {...props}/>
);

export default PrimaryButton