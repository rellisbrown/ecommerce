import React, { useState, useEffect } from 'react';
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  getDocs,
  DocumentData,
  doc,
  where,
} from 'firebase/firestore';
import { db, auth, app } from './firebaseClient';

const useProducts = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const qProducts = query(
      collection(db, 'products') /* , where("name", "==", params?.name) */
    );
    const getProducts = async () => {
      const productsSnapshot = await getDocs(qProducts);
      const tempProductList = [];
      productsSnapshot.forEach((item) => {
        tempProductList.push(item.data());
        // doc.data() is never undefined for query doc snapshots
        /* console.log(doc.id, " => ", doc.data()); */
      });
      setProductList(tempProductList);
    };

    getProducts();
  }, []);

  return productList;
};

export default useProducts;
