import React from 'react';
import { useEffect, useState } from 'react';
import { selectProductReducer } from '../../store/product/product.selector';
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux';
import { singleProductFetchAsync } from '../../store/product/product.action';
const singleproduct = () => {
const router=useRouter();
const post=router.query.singleproduct;
const { singleProduct } = useSelector(selectProductReducer);
const dispatch = useDispatch();
// const [post, setData] = useState('');
// setData(router.query.singleproduct)
// const post=router.query.singleproduct;
useEffect(() => {
 dispatch(singleProductFetchAsync(post));

}, [])

  return (
    <>
    <div> 


    <div className='container mx-auto flex flex-col gap-10 justify-center'>
            <div key={singleProduct.id}>
              <h1 className='text-[30px] font-bold'>Product {singleProduct.id}</h1>
              <p>Title: {singleProduct.title}</p>
              <p>Description: {singleProduct.description}</p>
              <p>Price: {singleProduct.price}</p>
      
    </div>
    </div>
    </div>
    </>
  )
}

export default singleproduct