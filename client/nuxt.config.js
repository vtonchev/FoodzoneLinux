
// CLIENT
export default {
  server: {
    port: 5000, 
    timing: false,  
    host: '0.0.0.0',
  },
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'UTF-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    script:[
      {src:"https://use.fontawesome.com/releases/v5.0.7/js/all.js"}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: false,
  /*
  ** Global CSS
  */
  css: [
    '~/assets/main.css'
  ],
  
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/plugins/localStorage.js', ssr: false},
    {src: '~/plugins/touch.js'}
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
    '@nuxtjs/auth'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true,
    baseURL: "http://localhost:3000"
  },
  proxy:{
    '/api': "http://localhost:3000"
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
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            propertyName: 'token'
          },
          logout: true
        }
      }
    }
  }
}
