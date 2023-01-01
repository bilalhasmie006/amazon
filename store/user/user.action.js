import { login } from '../services/user/user.services';
import { USER_ACTION_TYPES } from './user.types';

export const createAction = (type, payload) => ({ type, payload });

export const userscart = () => createAction(USER_ACTION_TYPES.USERS_CART);

export const addtocart = (payload) =>
  createAction(USER_ACTION_TYPES.Add_To_Cart, payload);
  export const quantitycart = (payload) =>
  createAction(USER_ACTION_TYPES.QUANTITY_Cart, payload);
  export const quantitydecreasecart = (payload) =>
  createAction(USER_ACTION_TYPES.QUANTITY_DECREASE_Cart, payload);

  export const deleteCart = (payload) =>
  createAction(USER_ACTION_TYPES.DELETE_CART, payload);

  export const addPrice = (payload) =>
  createAction(USER_ACTION_TYPES.ADD_PRICE, payload);

  export const removePrice = (payload) =>
  createAction(USER_ACTION_TYPES.REMOVE_PRICE, payload);
  
export const userLoginStart = () =>
  createAction(USER_ACTION_TYPES.USER_LOGIN_START);
export const userLoginSuccess = (payload) =>
  createAction(USER_ACTION_TYPES.USER_LOGIN_SUCCESS, payload);
export const userLoginFailed = (error) =>
  createAction(USER_ACTION_TYPES.USER_LOGIN_FAILED, error);
export const logoutuser = () =>
  createAction(USER_ACTION_TYPES.USER_LOGOUT);

// data.identifier='bilal'
// data.password='1234'

export const userLoginStartAsync = (data) => {
  return async (dispatch) => {
    dispatch(userLoginStart());
    try {
      const res = await login(data);

      dispatch(
        userLoginSuccess({
          data: res.data,
          message: res.message,
        })
      );
    } catch (error) {
      dispatch(userLoginFailed(error.message));
    }
  };
};

// export const showcart = () => createAction(USER_ACTION_TYPES.SHOW_CART);

//create a fake api call
// const fakeApiCall = (number) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (number > 0) {
//         resolve(number);
//       } else {
//         reject('Number must be greater than 0');
//       }
//     }, 2000);
//   });
// };

// export const setCountStartAsync = (number) => {
//   return async (dispatch) => {
//     dispatch(setCountStart());
//     try {
//       const res = await fakeApiCall(number);

//       dispatch(setCountSuccess(res));
//     } catch (error) {
//       dispatch(setCountFailure(error));
//     }
//   };
// };
