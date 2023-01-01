import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import UserLayout from '../layout/UserLayout';
import { selectProductReducer } from '../store/product/product.selector';
import { selectUserReducer } from '../store/user/user.selector';
import { productScrapAsync } from '../store/product/product.action';
//
import { useRouter } from 'next/router';
import { singleProductFetchAsync } from '../store/product/product.action';
import { addtocart } from '../store/user/user.action';
import { deleteCart } from '../store/user/user.action';
import { addPrice } from '../store/user/user.action';
import { removePrice } from '../store/user/user.action';
import { logoutuser } from '../store/user/user.action';
import { quantitycart } from '../store/user/user.action';
import { quantitydecreasecart } from '../store/user/user.action';
//   // userLoginStart,
//   // userLoginSuccess,
//   // userLoginFailure,
//   addtocart,
// } from '../store/user/user.action';

const ProductPage = () => {
  //   const fetchProducts = async () => {
  //     const response = await axios
  //       .get('https://fakestoreapi.com/products')
  //       .catch((error) => {
  //         console.log('error', error);
  //       });
  //     console.log(response.data);
  //   };
  // const list = useSelector((state) => state.user);
  const { list} = useSelector(selectProductReducer);
  const { singleProduct } = useSelector(selectProductReducer);
  const dispatch = useDispatch();
  const [productData, setproductData] = useState([]);
  const [listData, setlistData] = useState([]);
  const [idstorehook, setidstorehook] = useState(null);

  const [isAdded, setIsAdded] = useState(true);
//experiment:
const { cartlist,total,cartlistid } = useSelector(selectUserReducer);
const router=useRouter()



  // useEffect(() => {
  //   // await
  //   axios
  //     .get('https://fakestoreapi.com/products')
  //     .then((res) => {
  //       setproductData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  // useEffect(() => {
  //    setlistData(cartlist);
  // }, [cartlist]);

  useEffect(() => {
    dispatch(productScrapAsync());

  }, []);

  useEffect(() => {
    setproductData(list);
  }, [list]);
  // useEffect(() => {
  //   setproductData(list);
  // }, [cartlistid]);

  const addCartHandler = (post) => {
    dispatch(addtocart(post));
   // dispatch(calcart(post.id));
    dispatch(addPrice(post.price));
    console.log("cbncncn")
  };
function remove(post)
{
  dispatch(deleteCart(post.id));
  if(total!==0){
  dispatch(removePrice(post.price));
  }
}
// function checking(id){
//  const data= cartlist.filter((e)=>e.id===id)
//  console.log("this is data" + data )

// if (data===[]){
//   return 0;}
//   else{
//     return 1;
//   }
// }
function quantityincrease(post){
dispatch(quantitycart(post));
dispatch(addPrice(post.price));

}

// useEffect(()=>{

//  if(idstorehook!==null)
//     router.push('/single-product')


// },[idstorehook])

function idstore(post){
  // const id =post;
  router.push(`/single-product/${post.id}`)

  }
function quantityDecrease(post){
  dispatch(quantitydecreasecart(post));

  if(post.quantity!==1){
  dispatch(removePrice(post.price));
  }
  
  }

function logout()
{
  dispatch(logoutuser());
}
  return (
    <div>
      <div className='flex justify-center text-[30px] font-bold'>
        Product List
      </div>
      
      {productData.map((post) => {
        const { id, title, price, description,} = post;

        // const addCartHandler = () => {
        //   console.log('Product is', post.id, 'has title', post.title);

        //   // dispatch(userscart((productData)))
        // };

        return (
        <div>
          <div onClick={()=>idstore(post)} className='container mx-auto flex flex-col gap-10 justify-center'>
            <div key={post.id}>
              <h1 className='text-[30px] font-bold'>Product {post.id}</h1>
              <p>Title: {post.title}</p>
              <p>Description: {post.description}</p>
              <p>Price: {post.price}</p>
      </div>
      </div>
        <button id="btn"
          className={(cartlistid.includes(post.id)) ? 'bg-red-700 px-2 py-1 ': 'bg-blue-700 px-2 py-1'}
          onClick={() => {
           (cartlistid.includes(post.id))
            ?
             remove(post): addCartHandler(post);
            //  cartlist.id.
            //  btn.textContent= (cartlistid.includes(post.id)) ?
            // "Remove" : "Add";
            // //  btn.textContent="";
            }
          }
        >
            {(cartlistid.includes(post.id)) ? 'Remove ': 'ADD'}
          
        </button>
        
          </div> 
          
        );
      })}

<div className='flex justify-center text-[30px] font-bold'>
  <div className='flex flex-col'>
        <h1>products added to cartList</h1>
        <h1 className='flex justify-center text-[30px] font-bold'>Total Items:{cartlist.length}</h1>
        <h1 className='flex justify-center text-[30px] font-bold'>Total Price:{total}</h1>
        </div>
      </div>
      {/* <button className='bg-red-700 h-10 w-60 ' onClick={check}>
            {loading?'loading':'Log In My Account'}
            you want to see products
          </button> */}
        {cartlist.map((post) => {
          const { id, title, price, description } = post;
          return (
            <div
              className='container mx-auto flex flex-col gap-10 justify-center'
              key={post.id}
            >
              <h1 className='text-[30px] font-bold'>Product {post.id}</h1>
              <p>Title: {post.title}</p>
              <p>Description: {post.description}</p>
              <p>Price: {post.price}</p> 
              <button className='bg-red-700 h-10 w-60' onClick={()=>quantityincrease(post)}>
              +
          </button>
          <h1>{post.quantity}</h1>
          <button className='bg-red-700 h-10 w-60'  onClick={()=>quantityDecrease(post)}>
              -
          </button>
         { (post.quantity===1)? `$<button className='bg-red-700 h-10 w-60'  onClick={()=>quantityDecrease(post)}>
              -
          </button>`:
          `$<button className='bg-red-700 h-10 w-60'  onClick={()=>quantityDecrease(post)}>
              -
          </button>` }
         
              <button className='bg-blue-700 px-2 py-1' onClick={()=>remove(post)}>Delete</button>
            </div>
          );
        })}

<button className='bg-red-700 h-10 w-60 ' onClick={()=>logout()}>logout</button>
    </div>
  );
};

ProductPage.Layout=UserLayout;
export default ProductPage;
