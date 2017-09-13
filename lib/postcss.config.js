module.exports = ({ file, options, env }) => ({
  parser: false,
  plugins: {
    'postcss-import': { root: file.dirname },
    autoprefixer: {},
    cssnano: env === 'production' ? {} : false
  }
});
