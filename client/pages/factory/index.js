import { useEffect, useRef, useState } from 'react';
import ManagerFactory from '../../components/ManagerFactory';
import { Container, Row, Col } from 'react-bootstrap'


function Factory({ drizzle, drizzleState }) {

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


  return (
    <Container fluid>
      <Row>
        <Col >
          <ManagerFactory
            drizzle={drizzle}
            drizzleState={state.drizzleState}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Factory;
