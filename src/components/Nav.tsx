import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
function ColorSchemesExample() {
  const isActiveLink =(path)=>{
    return window.location.pathname===path? "active":"";
  }
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href={"/"}>Suppply Chain Management</Navbar.Brand>
          <Nav >
            <Nav.Link className={isActiveLink("/")} href={"/"}>Home</Nav.Link>

            <Nav.Link className={isActiveLink("/order")} href={"/order"}>Place Order</Nav.Link>
            <Nav.Link className={isActiveLink("/status")} href={"/status"}>Check Status</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default ColorSchemesExample;
