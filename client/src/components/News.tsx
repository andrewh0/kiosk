import React, { Component } from 'react';
import styled from 'styled-components';
import 'isomorphic-fetch';

type Article = {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string | null;
};

type NewsProps = {
  path?: string;
};

type NewsState = {
  articles: Array<Article>;
};

const NewsContainer = styled.div`
  overflow: scroll;
  height: 100%;
`;

const NewsTitle = styled.div`
  font-size: 32px;
  font-weight: 500;
  margin: 32px;
`;

class News extends Component<NewsProps, NewsState> {
  constructor(props: NewsProps) {
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
        {articles.map((article: Article, i: number) => (
          <NewsTitle key={i}>{article.title}</NewsTitle>
        ))}
      </NewsContainer>
    );
  }
}

export default News;
