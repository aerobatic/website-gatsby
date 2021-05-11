import React from 'react';
import styled from 'styled-components';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { chunk } from 'lodash-es';

const GENERATORS: string[] = ['jekyll', 'hugo', 'react', 'hexo', 'gatsby', 'html', 'yeoman'];

const StyledContainer = styled.div`
  img.logo {
    width: 200px;
    height: 85px;
  }
`;

export default () => {
  const generatorRows = chunk(GENERATORS, 3) as string[][];

  return (
    <StyledContainer>
      {generatorRows.map((row, i) => (
        <div className="row" key={i}>
          {row.map(generator => (
            <div key={generator} className="col-md-4">
              <AnchorLink className="" href={`#${generator}-generator`}>
                <img className="logo" src={`/img/logos/${generator}.png`} />
              </AnchorLink>
            </div>
          ))}
        </div>
      ))}
    </StyledContainer>
  );
};
