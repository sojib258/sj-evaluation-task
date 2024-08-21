"use client";
import Table from "@/components/Table";
import { Col, Row } from "antd";
export default function Home() {
  return (
    <Row className="min-h-[calc(100vh-14vh)]">
      <Col className="m-auto" span={16}>
        <Table />
      </Col>
    </Row>
  );
}
