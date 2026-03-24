export default ({ config }) => ({
  ...config,
  experiments: {
    ...config.experiments,
    baseUrl: process.env.GITHUB_PAGES ? '/pechinchoso' : ''
  }
});
