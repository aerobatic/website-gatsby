import React from 'react';
// import styled from 'styled-components';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { chunk } from 'lodash-es';

const GENERATORS: string[] = ['jekyll', 'hugo', 'react', 'hexo', 'gatsby', 'html', 'yeoman'];

export default () => {
  const generatorRows = chunk(GENERATORS, 3) as string[][];

  return (
    <div>
      {generatorRows.map(row => (
        <div className="row">
          {row.map(generator => (
            <div key={generator} className="col-md-4">
              <AnchorLink className="" href={`#${generator}-generator`}>
                <img src={`/img/logos/${generator}.png`} />
              </AnchorLink>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
