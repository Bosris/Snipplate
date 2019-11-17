module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',

  ],
  plugins: ['@babel/transform-runtime',  ["prismjs", {
    "languages": ["javascript", "css", "html"],
    "plugins": ["line-numbers", "show-language"],
    "theme": "okaidia",
    "css": true
  }]]
};