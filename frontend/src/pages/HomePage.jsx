import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product.jsx";
import Loader from "../components/Loader.jsx";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import Message from "../components/Message.jsx";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Paginate from "../components/Paginate.jsx";
import ProductCarousel from "../components/ProductCarousel.jsx";
import Meta from "../components/Meta.jsx";

const HomePage = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {!keyword ? (
        <ProductCarousel></ProductCarousel>
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go back
        </Link>
      )}
      {isLoading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          ></Paginate>
        </>
      )}
    </>
  );
};

export default HomePage;
