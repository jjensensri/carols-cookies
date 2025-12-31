'use client';

import { Button, Col, Container, Row } from 'react-bootstrap';

export default function NotFound() {
  return (
    <main>
      <Container>
        <Row>
          <Col>
            <h1>Whoops!</h1>
            <p>We can't find that page.</p>
            <Button className={`mt-4`} href="https://carolscookies.com/checkout">
              Back to checkout
            </Button>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
