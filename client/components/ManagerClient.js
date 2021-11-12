import React, { useEffect } from 'react'
import { Col, Container, Row, Button, Card } from 'react-bootstrap';

const ManagerClient = ({ drizzle, drizzleState }) => {
  const { ProductsContract } = drizzle.contracts;
  const { methods } = ProductsContract

  const { contracts, accounts } = drizzleState
  const mainAccount = accounts[0]

  const { ProductsContract: stateContract } = contracts
  const { countProducts, getProducts, getProduct } = stateContract

  const countProductsState = countProducts["0x0"]?.value
  const allProductsState = getProducts["0x0"]?.value
  const productsRawState = getProduct
  const productsKey = Object.keys(productsRawState)


  const handleCheckProduct = async (id) => {
    await methods["getProduct"].cacheCall(id,
/*        { from: mainAccount, gas: "3000000" }
 */       )
  }

  const handleGetProducts = async (e) => {
    await methods["getProducts"].cacheCall()
    await methods["countProducts"].cacheCall()
  }

  const handleSetClient = async ({ id, price }) => {
    await methods["setClient"].cacheSend(
      id, {
      value: price
    }
    );
  }

  useEffect(() => {
    console.log("COTRACT", stateContract)
    handleGetProducts()
  }, [])


  return (
    <Container fluid>
      <Row>    <h1 >  Manager Client </h1></Row>
      <Row>
        <Col >
          <h2>Count Products:  {countProductsState}</h2>
        </Col>

      </Row>
      <hr />

      {/* 
      <Row>
        <h2>Check a Product</h2>

        <Col >
          <h3>ID:<input type="number" onChange={(e) => setIdProductCheck(e.target.value)} /></h3>
        </Col>

        <Button variant="primary" size="lg" active onClick={handleOwner}>Check Product</Button>
      </Row >

      <hr />
*/}
      <Row>
        <Col xs="3">
          <h4> Click to see product details</h4>
          {allProductsState?.map(a => <Button key={a} style={{ margin: "4px" }} onClick={() => handleCheckProduct(a)}>{a}</Button>)}
        </Col>

        <Col>
          {productsKey.length > 0 && <h3> Products</h3>}

          {productsKey.length > 0 && productsKey.reverse().map(a => {
            let prd = productsRawState[a]
            return (
              <Card key={a}>
                <Card.Body>
                  <Card.Title>item ID: {prd.args[0]}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Price: {prd.value[3]}</Card.Subtitle>
                  <Card.Text>
                    <p>Factory: {prd.value[0]} </p>
                    <p>Deliver: {prd.value[1] != "0x0000000000000000000000000000000000000000" ? prd.value[1] : "Deliver not assigned yet"}</p>
                    <p>Consumer: {prd.value[2] != "0x0000000000000000000000000000000000000000" ? prd.value[2] : "Consumer not assigned yet"}</p>
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  {prd.value[1] != "0x0000000000000000000000000000000000000000"
                    && prd.value[2] === "0x0000000000000000000000000000000000000000"
                    && <Button onClick={() => handleSetClient({ id: prd.args[0], price: prd.value[3] })}>Buy Product</Button>}
                </Card.Footer>
              </Card>
            )
          })
          }
        </Col>

      </Row >


    </Container >)

}

export default ManagerClient
