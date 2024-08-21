import { Col, Row } from "antd";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
const App: React.FC = () => (
  <div className="min-h-screen flex flex-col">
    <Row className="h-12 bg-gray-800">
      <Col className="m-auto" span={16}>
        <Header />
      </Col>
    </Row>
    <Row className="flex-grow bg-white items-start">
      <Col className={"m-auto bg-white "} span={16}>
        <Content />
      </Col>
    </Row>
    <Row className="h-12 bg-gray-800">
      <Col className={"m-auto"} span={16}>
        <Footer />
      </Col>
    </Row>
  </div>
);

export default App;
