import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image'
import deliveryImage from '../public/delivery.png'
import { Col, Container, Row, Button } from 'react-bootstrap';


function Home({ drizzle, drizzleState }) {

  const [state, setState] = useState({ loading: true, drizzleState: drizzleState })

  const unsubscribe = useRef()

  useEffect(() => {
    // subscribe to changes in the store
    unsubscribe.current = drizzle.store.subscribe(() => {
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();
      console.log(drizzleState)
      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        setState({ loading: false, drizzleState });
      }
    }); return () => {
      unsubscribe.current()
    }
  }, [])
  console.log(drizzle.contracts)

  const router = useRouter()




  return (
    <Container className="App">
      <Row>
        <Col xs={6}>
          <h1 style={{ textAlign: "center", margin: "50px 0 50px 0 " }}>Logistics-Tracker</h1>
          <Row style={{ marginBottom: "5px" }}>
            <Button onClick={() => router.push('/factory')} variant="primary" size="lg">Manager Factory</Button>
          </Row>
          <Row style={{ marginBottom: "5px" }}>
            <Button onClick={() => router.push('/deliver')} variant="primary" size="lg">Manager Deliver</Button>
          </Row>
          <Row style={{ marginBottom: "5px" }} >
            <Button onClick={() => router.push('/consumer')} variant="primary" size="lg">Manager Consumer</Button>
          </Row>
        </Col>
        <Col>
          <Image alt="delivery" src={deliveryImage} />
        </Col>
      </Row>
      <Row>
      </Row>

    </Container>
  );
}

export default Home;
