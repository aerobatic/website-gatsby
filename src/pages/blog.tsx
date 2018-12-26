import React from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';
import Page from '../components/Page';
import IndexLayout from '../layouts';
import styled from 'styled-components';
import { colors } from '../styles/variables';
import { IBlogPost } from '../types';

const PostTile = styled.div`
  display: block;
  background-color: #eeeeee;
  padding: 0;
  height: 250px;
  cursor: pointer;
  margin-bottom: 20px;

  > a {
    display: block;
    padding: 15px;
    height: 100%;

    &:hover {
      text-decoration: none;
      background-color: #c8d6f5;
    }

    > h3 {
      margin-top: 0;
      margin-bottom: 7px;
      color: #000;
      font-size: 21px;
      font-weight: bold;
    }

    .date {
      color: #9da6a7;
      font-size: 14px;
      margin-bottom: 10px;
    }

    p {
      color: ${colors.black};
    }
  }
`;

interface IBlogIndexPageProps {
  data: {
    allMdx: { edges: { node: IBlogPost }[] };
  };
}

const BlogIndexPage = (props: IBlogIndexPageProps) => {
  const posts = props.data.allMdx.edges.map(edge => edge.node);

  // Gets posts in groups of 3
  const rows = [];
  for (let i = 0; i < posts.length; i += 1) {
    if (i % 3 === 0) {
      rows.push([posts[i]]);
    } else {
      rows[rows.length - 1].push(posts[i]);
    }
  }

  return (
    <IndexLayout>
      <Page marginTop="20px">
        <div className="container">
          {rows.map((row, index) => (
            <div className="row" key={index}>
              {row.map(post => (
                <div className="col-md-4" key={post.id}>
                  <PostTile>
                    <Link to={`/blog/${post.frontmatter.slug}/`}>
                      <h3>{post.frontmatter.title}</h3>
                      <div className="date">{post.frontmatter.date}</div>
                      <p>{post.frontmatter.description}</p>
                    </Link>
                  </PostTile>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Page>
    </IndexLayout>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      {
        allMdx(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { fileAbsolutePath: { regex: "/blog/.*.mdx$/" } }
        ) {
          edges {
            node {
              id
              excerpt(pruneLength: 250)
              frontmatter {
                slug
                date(formatString: "MMMM DD, YYYY")
                title
                description
              }
            }
          }
        }
      }
    `}
    render={data => <BlogIndexPage data={data} />}
  />
);
