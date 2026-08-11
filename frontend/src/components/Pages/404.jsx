import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Style from "../CSS/Global.module.css";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaHome } from "react-icons/fa";

const NotFound = () => {
  return(
    <div className={Style.noFound}>
      <Container>
        <Row>
          <Col>
            <div className={Style.content}>
              <h5>404</h5>
              <h1>Page Not Found</h1>
              <div className={Style.noFoundBtn}>
                <Link to="/" className="notFound__btn notFound__btn--primary"> <FaHome /> Back to Home </Link>
                <button type="button" className="notFound__btn notFound__btn--secondary" onClick={() => window.history.back()} > <FaArrowLeft /> Go Back </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default NotFound;