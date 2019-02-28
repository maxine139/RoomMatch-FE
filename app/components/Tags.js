import React from 'react'
import { View, StyleSheet, Button } from 'react-native'
//import R from '@res/R'
import BackgroundButton from './BackgroundButton'
//import addOrRemove from 'library/utils/addOrRemove'
export default class TagsView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: props.selected
    }
  }
render() {
    return (
      <View style={styles.container}>
        {this.makeButtons()}
      </View>
    )
  }
onPress = (tag) => {
//     let selected
//     if (this.props.isExclusive) {
//       selected = [tag]
//     } else {
//       selected = addOrRemove(this.state.selected, tag)
//     }
// this.setState({
//       selected
//     })
  }
makeButtons() {
    return this.props.all.map((tag, i) => {
return (
        <BackgroundButton
          backgroundColor={'#6a7a94'}
          textColor={'#fff'}
          onPress={() => {
            this.onPress(tag)
          }}
          key={i}
          title={tag} />
      )
    })
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    //padding: 20
  }
})
