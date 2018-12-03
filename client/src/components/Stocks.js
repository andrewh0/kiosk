import React, { Component } from 'react';
import { map } from 'lodash';
import numeral from 'numeral';
import styled from 'styled-components';
import 'isomorphic-fetch';

const StocksContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Stock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 32px;
`;

const Symbol = styled.div`
  font-size: 48px;
  font-weight: 700;
`;

const Caret = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 32px;
  margin-right: 16px;
  color: ${props => props.up ? 'green' : 'red'}
`;

const StockCompany = styled.div`
  display: flex;
  flex-direction: column;
`;

const LeftSide = styled.div`
  display: flex;
`;

const CompanyName = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #999;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
`;

const PriceChange = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #999;
  text-align: right;
`;

const Price = styled.div`
  display: flex;
  flex-direction: column;
`;

class Stocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      viewing: 'changePercent'
    };
  }
  componentDidMount() {
    fetch('/api/stocks')
      .then(res => res.json())
      .then(data => {
        this.setState({ data: map(data, o => o) });
      });
  }

  handleClick(e) {
    e.preventDefault();
    const states = ['change', 'changePercent', 'marketCap'];
    const nextIndex =
      (states.findIndex(v => v === this.state.viewing) + 1) % states.length;
    this.setState({ viewing: states[nextIndex] });
  }

  render() {
    const { data, viewing } = this.state;
    if (!data) {
      return null;
    }
    return (
      <StocksContainer>
        {data.map((ticker, i) => {
          const change = ticker.quote.change;
          const caret = change > 0 ? '▲' : '▼';
          return <Stock key={i}>
              <LeftSide>
                <Caret up={change > 0}>{caret}</Caret>
                <StockCompany>
                  <Symbol>{ticker.quote.symbol}</Symbol>
                  <CompanyName>
                    {ticker.quote.companyName}
                  </CompanyName>
                </StockCompany>
              </LeftSide>
              <Price onClick={this.handleClick.bind(this)}>
                <Symbol>
                  {numeral(ticker.quote.latestPrice).format('0.00')}
                </Symbol>
                <PriceChange>
                  {viewing === 'change' ? numeral(change).format('+0.00') : viewing === 'changePercent' ? numeral(ticker.quote.changePercent).format('+0.00%') : viewing === 'marketCap' ? numeral(ticker.quote.marketCap)
                        .format('0.00a')
                        .toUpperCase() : null}
                </PriceChange>
              </Price>
            </Stock>;
        })}
      </StocksContainer>
    );
  }
}

export default Stocks;
