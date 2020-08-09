import './asdf.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

export type IAsdfProp = StateProps;

export const Asdf = (props: IAsdfProp) => {
  const { message } = props;

  return (
    <Row>
      <Col md="1"/>
      <Col md="10">
        <h6 className="text-right">{message}</h6>
        <h1 className="text-capitalize text-center">
          <Translate contentKey="asdf.title">Title</Translate>
        </h1>
        <h5 className="text-center">
          <Translate contentKey="asdf.subtitle">Subtitle</Translate>
        </h5>
        <hr/>
        <p className="text-justify">
          <Translate contentKey="asdf.content">Content</Translate>
        </p>
      </Col>
      <Col md="1"/>
    </Row>
  )
}

const mapStateToProps = storeState => ({
  message: storeState.message
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Asdf);
