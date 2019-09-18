import React, { ReactNode } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import classnames from 'classnames';
import SectionHeader from './SectionHeader';
import { colors } from '../styles/variables';
import { PayPal, Mastercard, Visa, Amex } from '../icons/paymentTypes';

interface IPricePlan {
  title: string;
  subTitle: string;
  active: boolean;
  price: () => ReactNode;
  detailLines: () => ReactNode[];
  actionButton: () => ReactNode;
}

const GetStartedButton = () => (
  <Link className="btn btn-success btn-lg" to="/docs/getting-started/">
    Get Started Now
  </Link>
);

const PriceDisplay = (props: { amount: number; period: string }) => (
  <div className="price">
    <sup className="currency">$</sup>
    <span className="amount">{props.amount}</span>
    <sub className="period">{props.period}</sub>
  </div>
);

const CreditCards = () => (
  <div className="payment-types">
    <Visa />
    <Mastercard />
    <Amex />
    <PayPal />
  </div>
);

const PRICE_PLANS: IPricePlan[] = [
  {
    title: '30 day trial',
    subTitle: 'Kick the tires to learn how it works',
    price: () => (
      <div className="price">
        <span className="amount">free</span>
      </div>
    ),
    active: false,
    detailLines: () => {
      return [
        <li key={0}>
          Unlimited deployments to https:&#x2F;&#x2F;<strong>your-site-name</strong>
          .aerobaticapp.com
        </li>,
        <li key={1}>Access to all features</li>,
        <li key={2}>No credit card required</li>
      ];
    },
    actionButton: GetStartedButton
  },
  {
    title: 'Pro Plan',
    subTitle: "For when you're ready to go live",
    price: () => <PriceDisplay amount={15} period="/ mo per site" />,
    active: true,
    detailLines: () => [
      <li key={0}>Custom domain name</li>,
      <li key={1}>Auto-renewing SSL certificate</li>,
      <li key={2}>Priority support</li>,
      <li key={3}>
        <CreditCards />
      </li>
    ],
    actionButton: GetStartedButton
  },
  {
    title: 'Org Plan',
    subTitle: 'For orgs that create a lot of sites',
    price: () => <PriceDisplay amount={150} period="/ mo" />,
    active: false,
    detailLines: () => [
      <li key={0}>
        50 sub-domains on single root domain, i.e.
        <br />
        https:&#x2F;&#x2F;<strong>site1</strong>.custom.com,
        <br />
        https:&#x2F;&#x2F;<strong>site1</strong>.custom.com
      </li>,
      <li key={1}>Same benefits as Pro Plan</li>,
      <li key={2}>
        <Link to="/blog/announcing-organization-pricing-plan/">Learn more →</Link>
      </li>
    ],
    actionButton: () => (
      <a
        className="btn btn-success btn-lg"
        href="mailto:support@aerobatic.com?subject=Org+plan+inquiry"
      >
        Contact Us
      </a>
    )
  }
];

const StyledSection = styled.section`
  .plans {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .plan {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 0 0 300px;
    border-radius: 4px;
    margin: 10px;
    border: 1px solid ${colors.lightGray};
    text-align: center;
  }

  .plan.active {
    border-top: solid 4px ${colors.primaryDark};
  }

  header {
    h3 {
      font-size: 24px;
      font-weight: 100;
      margin: 12px 0 8px 0;
    }
    p {
      color: ${colors.gray};
      margin: 0;
    }
  }

  .price {
    display: flex;
    align-items: center;
    justify-content: center;
    .amount {
      display: inline-block;
      font-size: 42px !important;
      position: relative;
      margin-right: 3px;
    }

    .currency {
      color: ${colors.gray};
      font-size: 16px;
      display: inline-block;
      position: relative;
      margin-right: 3px;
    }

    .period {
      font-size: 18px;
      color: ${colors.gray};
    }
  }

  ul.details {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      font-size: 14px;
      padding: 8px;
      border-bottom: solid 1px ${colors.lightGray};
    }
  }

  .payment-types {
    svg {
      fill: ${colors.gray};
      width: 40px;
      height: 40px;
      margin-right: 7px;
    }
  }

  footer {
    a.btn {
      display: block !important;
      margin: 15px;
    }
  }
}`;

export default () => (
  <StyledSection id="pricing">
    <SectionHeader
      header="Clear and simple pricing"
      subHeader="New websites begin on the 30 day trial to test out all Aerobatic has to offer."
    />

    <div className="plans">
      {PRICE_PLANS.map((plan, i) => (
        <div className={classnames('plan', { active: plan.active })} key={i}>
          <div>
            <header>
              <h3>{plan.title}</h3>
              <p>{plan.subTitle}</p>
            </header>
            {plan.price()}
            <ul className="details">{plan.detailLines()}</ul>
          </div>
          <footer>{plan.actionButton()}</footer>
        </div>
      ))}
    </div>
  </StyledSection>
);
