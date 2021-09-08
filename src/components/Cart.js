import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + Number(curr.price), 0));
  }, [cart]);

  return (
    <div className="cart">
      <div className="productContainer">
        <ListGroup>
          {cart.map((product) => (
            <ListGroup.Item key={product.id}>
              <Row>
                <Col md={2}>
                  <Image src={product.image} alt={product.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{product.name}</span>
                </Col>
                <Col md={2}>
                  <span>$ {product.price.split(".")[0]}</span>
                </Col>
                <Col md={2}>
                  <Rating rating={product.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={product.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: product.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(product.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <AiFillDelete
                    fontSize="20px"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: product,
                      })
                    }
                  />
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="summary">
        <div className="summaryHeader">Order Summary</div>
        <div className="summaryTitle">
          <span className="title">Total ({cart.length}) items</span>
          <span className="title">Price</span>
        </div>

        {cart.map((product) => (
          <>
            <div className="summaryDetail">
              <span>
                {product.name} * {product.qty}
              </span>
              <span>{product.price}</span>
            </div>
          </>
        ))}

        <div className="summarySubtitle">
          <span className="title">Total Price : ${total}</span>
        </div>
        <Button style={{ width: "95%", margin: "10px 10px" }} variant="dark">
          Process to ChecKout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
