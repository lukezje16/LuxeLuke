import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import {
  useGetOrdersQuery,
  useDeleteOrderMutation,
} from "../../slices/orderApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaTimes, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const OrderListPage = () => {
  const { data: orders, isLoading, refetch, error } = useGetOrdersQuery();
  const [deleteOrder, { isLoading: loadingDelete }] = useDeleteOrderMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete the order?")) {
      try {
        await deleteOrder(id);
        refetch();
        toast.success("order deleted successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };
  console.log(orders);
  return (
    <>
      <h1>Orders</h1>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>USER</th>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.user && order.user.name}</td>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>£{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm mx-2"
                    onClick={() => deleteHandler(order._id)}
                  >
                    <FaTrash style={{ color: "white" }} className=""></FaTrash>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListPage;
