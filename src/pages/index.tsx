import * as React from 'react';
import { Location } from '../types';
import Page from '../components/Page';
import IndexLayout from '../layouts';
import Jumbotron from '../components/Jumbotron';
import Features from '../components/Features';
import TerminalSimulation from '../components/TerminalSimulator/';

const IndexPage = (props: { location: Location }) => (
  <IndexLayout location={props.location}>
    <Page>
      <Jumbotron>
        <h1>Turbocharged static web hosting</h1>
        <p className="sub-title">
          Blazing fast performance on our highly tuned, purpose-built CDN. Expand the possibilities
          of static sites with plugins.
        </p>
      </Jumbotron>
      <div className="container">
        <TerminalSimulation />
        <Features />
      </div>
    </Page>
  </IndexLayout>
);

export default IndexPage;
