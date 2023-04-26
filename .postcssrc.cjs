module.exports = {
  plugins: {
    autoprefixer: {
      Browserslist: ["Android >= 4.0", "iOS >= 7"],
    },
    "postcss-pxtorem": {
      rootValue: 37.5, //结果为：设计稿元素尺寸/37.5，比如元素宽375px,最终页面会换算成 10rem
      propList: ["*"],
      // selectorBlackList: [
      //   'van-'
      // ],
    },
  },
};