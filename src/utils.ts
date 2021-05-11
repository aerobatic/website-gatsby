// Asynchronously load an external script and append it to the <head>
export async function loadScript(scriptUrl: string) {
  const elem = document.createElement('script');
  elem.setAttribute('src', scriptUrl);
  document.head.append(elem);
  return new Promise(resolve => {
    elem.addEventListener('load', () => {
      resolve();
    });
  });
}

// This is to match how the Algolia docsearch is configured
// https://github.com/algolia/docsearch-configs/blob/master/configs/aerobatic.json
export const legacyNavClassnames = { 'nav-stacked': true };
