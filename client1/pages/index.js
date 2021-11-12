import { useEffect, useRef, useState } from 'react';
import Link from 'next/link'

import Lectura from '../components/ManagerFactory';

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


  return (
    <div className="App">

      <ul>
        <li>
          <Link href="/factory">
            <a>Factory</a>
          </Link>
        </li>
        <li>
          <Link href="/deliver">
            <a>Deliver</a>
          </Link>
        </li>
        <li>
          <Link href="/consumer">
            <a>Consumer</a>
          </Link>
        </li>
      </ul>
      <Lectura
        drizzle={drizzle}
        drizzleState={state.drizzleState}
      />
    </div>
  );
}

export default Home;
