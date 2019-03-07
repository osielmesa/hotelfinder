import * as Keychain from 'react-native-keychain';
import {loginEndpoint, contentTypeLogin} from '../../common/api'
import {
  HIDE_LOADING_LOGIN,
  SHOW_LOADING_LOGIN,
  SHOW_LOGIN_ERROR_MESSAGE,
  HIDE_LOGIN_ERROR_MESSAGE,
  UPDATE_USER_INFO,
  LOGOUT,
} from "../../common/redux/ActionTypes";

import {hideLoading, showLoading} from "../../common/redux/UIActions";

export const showLoadingLogin = () => ({
  type: SHOW_LOADING_LOGIN
})

export const hideLoadingLogin = () => ({
  type: HIDE_LOADING_LOGIN
})

export const showLoginErrorMessage = (text) => ({
  type: SHOW_LOGIN_ERROR_MESSAGE,
  payload: text
})

export const hideLoginErrorMessage = () => ({
  type: HIDE_LOGIN_ERROR_MESSAGE
})

export const updateUser = (user, token) => ({
  type: UPDATE_USER_INFO,
  payload: {user,token}
})

export const login = ({ username, password }) => {
  return dispatch => {
    dispatch(showLoadingLogin())
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': contentTypeLogin,
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }
    fetch(loginEndpoint, config)
      .then(res => {
        if(!res.ok || res.status !== 200){
          res.json().then( jsonResonse => {
            // I assume non_field_errors[0] as the correct message to show
            if(jsonResonse.non_field_errors && jsonResonse.non_field_errors.length > 0){
              dispatch(showLoginErrorMessage(jsonResonse.non_field_errors[0]))
            }
          }).catch(error => {
            console.log('ERROR parsing login error json: ',error)
          })
          dispatch(hideLoadingLogin())
          console.log('ERROR LOGIN: ',res)
          return;
        }
        res.json().then(jsonResonse => {
          const user = {
            first_name:jsonResonse.first_name,
            last_name:jsonResonse.last_name,
            user_id:jsonResonse.user_id,
            email: jsonResonse.email
          }
          dispatch(updateUser(user, jsonResonse.token))
          //Save username and password in security way
          saveSecurityData(username, password)
        }).catch(error => {
          console.log('ERROR parsing login json: ',error)
        })
        dispatch(hideLoading())
        dispatch(hideLoadingLogin())
        dispatch(hideLoginErrorMessage())
        console.log('LOGIN OK', res)
      }).catch(error => {
        // I assume that if there is an error is because internet connection
        // but some smart error type verification can be done here.
        dispatch(showLoginErrorMessage('Error: Please check the internet connection!'))
        dispatch(hideLoadingLogin())
        dispatch(hideLoadingLogin())
        console.log('ERROR LOGIN: ',error)
      })
  }
}

const saveSecurityData = (username, password) => {
  if(username,password){
    Keychain.resetGenericPassword().then(reseted => {
      Keychain.setGenericPassword(username, password).then(saved => {
        console.log('Security data has been saved.')
      })
    }).catch(error => {
      console.log('Keychain couldn\'t be accessed!', error);
    })
  }else{
    console.log('AccessToken incorrect value in saveSecurityToken.');
  }
}

export const deleteSecurityData = () => {
  return dispatch => {
    Keychain.resetGenericPassword().then(reseted => {
      console.log('Security data has been removed.')
    }).catch(error => {
      console.log('Keychain couldn\'t be accessed!', error);
    })
  }
}

export const getSecurityData = () => {
  return dispatch => {
    dispatch(showLoading('Loading...Please wait!'))
    try {
      Keychain.getGenericPassword().then(credentials => {
        if (credentials.username && credentials.password) {
          const username = credentials.username
          const password = credentials.password
          dispatch(login({username,password}))
        }else{
          dispatch(hideLoading())
          console.log('There is not security data saved!');
        }
      }).catch(error => {
        dispatch(hideLoading())
        console.log('Keychain couldn\'t be accessed!', error);
      })
    } catch (error) {
      dispatch(hideLoading())
      console.log('Keychain couldn\'t be accessed!', error);
    }
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(deleteSecurityData())
    dispatch({type:LOGOUT})
  }
}

