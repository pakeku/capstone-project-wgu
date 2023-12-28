import React from "react";
import { Spinner } from "react-bootstrap";

export const PageLoader: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center loader" style={{ height: "100vh" }}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};