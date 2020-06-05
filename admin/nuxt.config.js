//ADMIN
require('dotenv').config();
export default {
  server: {
    host: process.env.SERVER_URL,
    port: process.env.SERVER_PORT, 
    timing: false
  },
  mode: process.env.MODE,
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'stylesheet', href: '/css/default.css' }
    ],
    script:[
      { src:"https://kit.fontawesome.com/bac9e42282.js", crossorigin:"anonymous" }
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/moment'
  ],
  moment: {
    locales: ['bg'],
    defaultLocale: 'bg'
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  // axios: {
  //   proxy: true,
  //  
  // },
  // proxy:{
  //   '/api/': "http://127.0.0.1:3000/"
  // },
  axios: {
    proxy: true,
    retry: { retries: 3 }
  },
  proxy: {
    '/api/': process.env.PROXY_URL + ':' + process.env.PROXY_PORT,
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
