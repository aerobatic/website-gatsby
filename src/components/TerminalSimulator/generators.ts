import jekyllLogo from '../../img/logos/jekyll.png';
import hugoLogo from '../../img/logos/hugo.png';
import gatsbyLogo from '../../img/logos/gatsby.png';
import hexoLogo from '../../img/logos/hexo.png';
import htmlLogo from '../../img/logos/html.png';
import reactLogo from '../../img/logos/react.png';

const aeroCreateOutput = 'Creating new Aerobatic website in this directory';

const aeroDeployOutput = [
  'Compressing website assets',
  'Uploading source archive',
  'Waiting for cloud deployment to begin',
  'Cloud deployment in-progress'
];

function aeroCreateSuccess(url: string): string {
  return `Website ${url} created`;
}

function aeroDeploySuccess(url: string): string {
  return `Version v1 deployment complete\nView it now at ${url}`;
}

export interface IGenerator {
  title: string;
  commands: IGeneratorCommand[];
  logo: any;
}

export interface IGeneratorCommand {
  text: string;
  output?: string[];
  success?: string;
}

const GENERATORS: Record<string, IGenerator> = {
  html: {
    title: 'plain html',
    logo: htmlLogo,
    commands: [
      {
        text: "echo '<html>Aerobatic is easy!</html>' > index.html"
      },
      {
        text: 'aero create',
        output: [aeroCreateOutput],
        success: aeroCreateSuccess('https://basic-html.aerobaticapp.com')
      },
      {
        text: 'aero deploy',
        output: aeroDeployOutput,
        success: aeroDeploySuccess('https://html-demo.aerobaticapp.com')
      }
    ]
  },
  jekyll: {
    title: 'Jekyll',
    logo: jekyllLogo,
    commands: [
      {
        text: 'jekyll new jekyll-demo',
        output: ['Creating new Jekyll site', 'Running bundle install'],
        success: 'New jekyll site created'
      },
      {
        text: 'cd jekyll-demo'
      },
      {
        text: 'aero create',
        output: [aeroCreateOutput],
        success: aeroCreateSuccess('https://jekyll-demo.aerobaticapp.com')
      },
      {
        text: 'jekyll build',
        output: ['Building jekyll site'],
        success: 'Done building site'
      },
      {
        text: 'aero deploy --directory _site',
        output: aeroDeployOutput,
        success: aeroDeploySuccess('https://jekyll-demo.aerobaticapp.com')
      }
    ]
  },
  hugo: {
    title: 'Hugo',
    logo: hugoLogo,
    commands: [
      {
        text: 'hugo new site hugo-site',
        output: ['Creating hugo site'],
        success: 'Hugo site created'
      },
      {
        text: 'cd hugo-site'
      },
      {
        text: '(cd themes; git clone https://github.com/saey55/hugo-elate-theme)',
        output: ['Cloning hugo theme'],
        success: 'Theme cloned'
      },
      {
        text: 'aero create',
        output: [aeroCreateOutput],
        success: aeroCreateSuccess('https://hugo-demo.aerobaticapp.com')
      },
      {
        text: 'hugo',
        output: ['Building hugo site'],
        success: 'Done building site'
      },
      {
        text: 'aero deploy --directory public',
        output: aeroDeployOutput,
        success: aeroDeploySuccess('https://hugo-demo.aerobaticapp.com')
      }
    ]
  },
  hexo: {
    title: 'Hexo',
    logo: hexoLogo,
    commands: [
      {
        text: 'hexo init new-hexo-site'
      },
      {
        text: 'cd new-hexo-site'
      },
      {
        text: 'npm install',
        output: ['Installing npm modules'],
        success: 'Done with npm install'
      },
      {
        text: 'aero create',
        output: [aeroCreateOutput],
        success: aeroCreateSuccess('https://hexo-demo.aerobaticapp.com')
      },
      {
        text: 'hexo generate',
        output: ['Generating hexo site'],
        success: 'Done generating site'
      },
      {
        text: 'aero deploy --directory public',
        output: aeroDeployOutput,
        success: aeroDeploySuccess('https://hexo-demo.aerobaticapp.com')
      }
    ]
  },
  gatsby: {
    title: 'Gatsby',
    logo: gatsbyLogo,
    commands: [
      {
        text: 'gatsby new gatsby-project',
        output: ['Creating new site', 'Installing packages'],
        success: 'Gatsby done creating starter site'
      },
      {
        text: 'cd gatsby-project'
      },
      {
        text: 'aero create --name gatsby-demo',
        output: [aeroCreateOutput],
        success: 'Website https://gatsby-demo.aerobaticapp.com created'
      },
      {
        text: 'gatsby build',
        output: ['Building CSS', 'Building production JavaScript bundles', 'Building static HTML for pages'],
        success: 'Done building'
      },
      {
        text: 'aero deploy --directory public',
        output: aeroDeployOutput,
        success: aeroDeploySuccess('https://gatsby-demo.aerobaticapp.com')
      }
    ]
  },
  react: {
    title: 'React',
    logo: reactLogo,
    commands: [
      {
        text: 'create-react-app demo-react-app',
        output: ['Creating a new React app', 'Installing packages', 'Installing react-scripts'],
        success: 'Success! Created demo-react-app'
      },
      {
        text: 'cd demo-react-app'
      },
      {
        text: 'aero create',
        output: [aeroCreateOutput],
        success: 'Website https://react-demo.aerobaticapp.com created'
      },
      {
        text: 'yarn build',
        output: ['Creating an optimized production build'],
        success: 'Successfully compiled app'
      },
      {
        text: 'aero deploy --directory build',
        output: aeroDeployOutput,
        success: aeroDeploySuccess('https://react-demo.aerobaticapp.com')
      }
    ]
  }
};

export default GENERATORS;
