import React from 'react';
import styled from '@emotion/styled';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import ProductCard from './ProductCard';

const ProductList = ({ productList }) => {
  const test = 1;
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {productList.map((product) => (
          <Grid key={product.id} item xs={12} md={6}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
