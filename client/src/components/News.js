import React, { Component } from 'react';
import styled from 'styled-components';
import 'isomorphic-fetch';

const NewsContainer = styled.div`
  overflow: scroll;
  height: 100%;
`;

const NewsTitle = styled.div`
  font-size: 32px;
  font-weight: 500;
  margin: 32px;
`;

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }
  componentDidMount() {
    fetch('/api/news')
      .then(res => res.json())
      .then(({ articles }) => {
        this.setState({ articles });
      });
  }
  render() {
    const { articles } = this.state;
    return (
      <NewsContainer>
        {articles.map((article, i) => (
          <NewsTitle key={i}>{article.title}</NewsTitle>
        ))}
      </NewsContainer>
    );
  }
}

export default News;
