import { userscart } from './user.action';
import { USER_ACTION_TYPES } from './user.types';

const INITIAL_STATE = {
  user: null,
  error: false,
  message: false,
  loading: false,
  cartlist: [],
  cartlistid: [],
  total:0
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.Add_To_Cart: {
      //calculation: check(if quaantity)
//this calculation is applied to check if there is a product already present or not....
      // let lengthCurrentCart = state.user.list.map((cartItem)=>(cartItem.id===payload.id)).length;
      // let newCart=[];

      // if(lengthCurrentCart>0){
      //   newCart=state.user.list.filter((cartItem)=>(cartItem.id!==payload.id));
      //   let currentItem={...payload,quantinty:}
      // }
      // if(state.user.list.map(x=>x.id===payload.id).length>0)
// if(payload.id===cartlist.id){
//   return {
//     ...state,
//     cartlist: [...state.cartlist, cartlist[id].quantity+1], // append ho jae ga
//   };

let product
let newproducts=[...state.cartlist]

if(state.cartlist.filter((item)=>item.id===payload.id).length>0)

{
  product=state.cartlist.filter((item)=>item.id===payload.id)[0];
  // product.quantity=product.quantity+1;
  product={...product,quantity:(product.quantity+1)||1}
  newproducts=state.cartlist.filter((item)=>item.id!==payload.id)
}

else{
  product={...payload,quantity:1}
}

      return {
        ...state,
        cartlist: [...newproducts, product], // append ho jae ga
       // cartlist: [...state.cartlist, cartlist[payload.id].quantity+1], //add to cart mai hum jae quantity nai burha sakte khunke is nae sirf iik baar hi call hona he
       cartlistid: [...state.cartlistid, payload.id],//question how to get??

      };
    
    }
    case USER_ACTION_TYPES.QUANTITY_Cart:{
      let product
      let newproducts=[...state.cartlist]
      
      if(state.cartlist.filter((item)=>item.id===payload.id).length>0)
      
      {
        product=state.cartlist.filter((item)=>item.id===payload.id)[0];
        // product.quantity=product.quantity+1;
        product={...product,quantity:(product.quantity+1)||1}
        newproducts=state.cartlist.filter((item)=>item.id!==payload.id)
      }
      
      else{
        product={...payload,quantity:1}
      }



      // state.cartlist[payload].quantity=state.cartlist[payload].quantity+1;
      // if(payload===state.cartlist.id){
  return {
    // ...state.cartlist,  //?????????????????? will it work
    // cartlist: [...state.cartlist, state.cartlist[payload].quantity+1],
    ...state,
    cartlist: [...newproducts, product], // append ho jae ga
  }}
//   else{
//     return {
//       ...state,
//       // quantity:1;
//       cartlist: [...state.cartlist, state.cartlist[payload].quantity], // append ho jae ga
//     };

//   }
// }

case USER_ACTION_TYPES.QUANTITY_DECREASE_Cart:{
  let product
  let newproducts=[...state.cartlist]
  if(state.cartlist.filter((item)=>item.id===payload.id).length>0)
      
  {
    product=state.cartlist.filter((item)=>item.id===payload.id)[0];
    // product.quantity=product.quantity+1;
    product={...product,quantity:(product.quantity-1)||1}
    newproducts=state.cartlist.filter((item)=>item.id!==payload.id)
  }
  
  else{
    product={...payload,quantity:1}
  }

  return {
    // ...state.cartlist,  //?????????????????? will it work
    // cartlist: [...state.cartlist, state.cartlist[payload].quantity+1],
    ...state,
    cartlist: [...newproducts, product], // append ho jae ga
  }}












    case USER_ACTION_TYPES.ADD_PRICE:
       return{
        ...state,
         total:state.total+payload
         }


    case USER_ACTION_TYPES.REMOVE_PRICE:{
          const payload1=payload.toFixed(2);
          const total1=state.total.toFixed(2);
      console.log(payload1);
          // console.log(state.total);
          // console.log(payload);
      return{...state,
       
         total:total1-payload1}
      }

    case USER_ACTION_TYPES.DELETE_CART:{   
          const data=state.cartlist.filter((e)=>e.id!==payload);
          const data2=state.cartlistid.filter((e)=>e!==payload);
          return{
            ...state,
            cartlist:data,
            cartlistid: data2,
          }
        }
  
    case USER_ACTION_TYPES.USER_LOGIN_START:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };

    case USER_ACTION_TYPES.USER_LOGIN_SUCCESS:
      return {
        ...state,

        loading: false,
        message: payload.message,
        user: payload.data,
      };

    case USER_ACTION_TYPES.USER_LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        error: true,
      };
      case USER_ACTION_TYPES.USER_LOGOUT:
      return {
        ...state,

        loading: false,
        message: false,
        user: null,
      };

    default:
      return state;
  }
};
// api call for users

// const todoReducer = (state = INITIAL_STATE, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case TODO_ACTION_TYPE.ADD_ITEM:
//       const { id, data } = action.payload;
//       return {
//         ...state,
//         list: [
//           ...state.list,
//           {
//             id: id,
//             data: data,
//           },
//         ],
//       };
//     case TODO_ACTION_TYPE.DELETE_ITEM:
//       const newList = state.list.filter((element) => element.id != action.id);
//       return {
//         ...state,
//         list: newList,
//       };

//     case TODO_ACTION_TYPE.DELETE_ALL_ITEMS:
//       return {
//         ...state,
//         list: [],
//       };

//     default:
//       return state;
//   }
// };
