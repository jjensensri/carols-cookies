'use client';

import { Button, Col, Container, Row } from 'react-bootstrap';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main>
      <Container>
        <Row>
          <Col>
            <h1>Oh no!</h1>
            <p>
              There was an issue with our storefront. This could be a temporary issue, please try
              your action again.
            </p>
            <Button onClick={() => reset()}>Try Again</Button>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
