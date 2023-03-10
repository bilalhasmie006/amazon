import { login } from '../services/user/user.services';
import { productapi } from '../services/product/product.services';
import { PRODUCT_ACTION_TYPES } from './product.types';
import axios from 'axios';
export const createAction = (type, payload) => ({ type, payload });

// export const productscrap = () => createAction(USER_ACTION_TYPES.PRODUCT_SCRAP);

export const productScrapStart = () =>
  createAction(PRODUCT_ACTION_TYPES.PRODUCT_SCRAP_START);
export const productScrapSuccess = (payload) =>
  createAction(PRODUCT_ACTION_TYPES.PRODUCT_SCRAP_SUCCESS, payload);
export const productScrapFailed = (error) =>
  createAction(PRODUCT_ACTION_TYPES.PRODUCT_SCRAP_FAILED, error);
  
export const singleProductScrapSuccess = (payload1) =>
  createAction(PRODUCT_ACTION_TYPES.SINGLE_PRODUCT_SCRAP_SUCCESS, payload1);


// export const addtocart = (payload) =>
//   createAction(USER_ACTION_TYPES.Add_To_Cart, payload);

//tub lage gi jub product.services mai api call hoga

// export const productScrapAsync = (data) => {
//   return async (dispatch) => {
//     dispatch(productScrapStart());
//     try {
//       const res = await login(data);

//       dispatch(
//         productScrapSuccess({
//           data: res.data,
//           message: res.message,
//         })
//       );
//     } catch (error) {
//       dispatch(productScrapFailed(error.message));
//     }
//   };
// };
//api call
export const productScrapAsync = () => {
  return async (dispatch) => {
    dispatch(productScrapStart());

    try {
      const { data, status } = await axios.get(
        'https://fakestoreapi.com/products'
      );
// const newdata=data.map(()=>item)
      dispatch(productScrapSuccess(data));
    } catch (error) {
      dispatch(productScrapFailed(error));
    }
  };
};
export const singleProductFetchAsync = (payload) => {
  return async (dispatch) => {
    dispatch(productScrapStart());

    try {
      console.log("tjis ia the"+payload)
      const { data, status } = await axios.get(
        `https://fakestoreapi.com/products/${payload}`
      );
// const newdata=data.map(()=>item)
      dispatch(singleProductScrapSuccess(data));
    } catch (error) {
      dispatch(productScrapFailed(error));
    }
  };
};