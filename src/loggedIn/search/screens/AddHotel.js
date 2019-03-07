// I am not sure why add hotel is not working with the API,
// I am doing something wrong because using postman I was available to add it
// I dont include in the form image and positioning map because of the time.
// I also run out of time to persist data locally in the device.
// The app is proportional in all devices and listen for orientation changes.
// I use animation as well.
// I use modularity software design principle which is a specialization of the principle of separation of concerns.
// Following the principle of modularity implies separating software into components according to functionality and responsibility.
import React, {Component} from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";

import {headerStyle, headerTitleStyle, isTextValid} from "../../../common/utils";
import theme from "../../../common/theme";
import {ButtonSubmit, TextField} from "../../../common/components";
import {addHotel} from "../redux/SearchActions";

class AddHotel extends Component {
  static navigationOptions = () => {
    return {
      headerTitle:'Add hotel',
      headerStyle: headerStyle,
      headerTintColor: theme.colors.headerTintColor,
      headerTitleStyle: headerTitleStyle,
    }
  }


  addHotelSubmit = (values) => {
    const {token, user} = this.props
    this.props.dispatch(addHotel({
      token:token,
      name:values.name,
      city:values.city,
      country:values.country,
      stars:values.stars,
      description:values.description,
      price:values.price,
      location: "1.2",
      userId:user.user_id
    }))
    this.props.navigation.navigate('Tabs')
  }
  render() {
    const {invalid, error,submitting,handleSubmit, orientation} = this.props
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.contentView}>
            <Field
              component={TextField}
              label={'Name'}
              name={'name'}
              validate={isTextValid}
              errorEmptyText={'Name is required'}
              width={orientation === 'portrait' ? 270 : 450}
              multiline={true}
            />
            <View style={styles.containerField}>
              <Field
                component={TextField}
                label={'City'}
                name={'city'}
                validate={isTextValid}
                errorEmptyText={'City is required'}
                width={orientation === 'portrait' ? 270 : 450}
                multiline={true}
              />
            </View>
            <View style={styles.containerField}>
              <Field
                component={TextField}
                label={'Country'}
                name={'country'}
                validate={isTextValid}
                errorEmptyText={'Country is required'}
                width={orientation === 'portrait' ? 270 : 450}
                multiline={true}
              />
            </View>
            <View style={styles.containerField}>
              <Field
                component={TextField}
                label={'Stars'}
                name={'stars'}
                validate={isTextValid}
                errorEmptyText={'Stars is required'}
                width={orientation === 'portrait' ? 270 : 450}
                keyboardType={'number-pad'}
              />
            </View>
            <View style={styles.containerField}>
              <Field
                component={TextField}
                label={'Description'}
                name={'description'}
                validate={isTextValid}
                errorEmptyText={'Stars is required'}
                width={orientation === 'portrait' ? 270 : 450}
                multiline={true}
              />
            </View>
            <View style={styles.containerField}>
              <Field
                component={TextField}
                label={'Price'}
                name={'price'}
                validate={isTextValid}
                errorEmptyText={'Price is required'}
                width={orientation === 'portrait' ? 270 : 450}
                keyboardType={'decimal-pad'}
              />
            </View>
          </View>
          <View style={{marginTop:orientation === 'portrait' ? 50 : 10, justifyContent: 'center', alignItems: 'center'}}>
            <ButtonSubmit
              title={'ADD HOTEL'}
              disabled={invalid && !error}
              submitting={submitting}
              width={orientation === 'portrait' ? 270 : 450}
              onPress={handleSubmit(this.addHotelSubmit)}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'space-around'
  },
  contentView:{
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  containerField:{
    marginTop:10
  }
})

const mapStateToProps = state => ({
  orientation: state.ui.orientation,
  token: state.login.token,
  user: state.login.user,
});

export default connect(mapStateToProps)(reduxForm({form:'AddHotel'})(AddHotel))
