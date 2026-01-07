import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { useSelector } from "react-redux";

function NavigationBar() {
  const { cartItems } = useSelector((state) => state.cartItemData);
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Ecommer Ecart
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/product-cart">
              cart <Badge bg="danger">{cartItems.length}</Badge>
            </Nav.Link>
            <Nav.Link as={Link} to="/user-profile">
              Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
