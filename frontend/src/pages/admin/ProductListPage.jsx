import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import {
  useGetProductsQuery,
  useCreateProductMutation,
} from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const ProductListPage = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  async function deleteHandler(id) {
    console.log("delete");
  }

  async function createProductHandler() {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  }

  return (
    <>
      <Row className="aling-itmes-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createProductHandler}>
            <FaEdit />
            Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader></Loader>}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <th>Name</th>
              <th>ID</th>
              <th>Price</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product._id}</td>
                  <td>£{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit></FaEdit>
                      </Button>
                    </LinkContainer>
                  </td>
                  <Button
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <FaTrash style={{ color: "red" }} />
                  </Button>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductListPage;
