require('dotenv').config()
const path = require('path')
const routes = require('./src/routes')

const lti = require('ltijs').Provider

// Setup
lti.setup('EXAMPLEKEY',
  {
    url: 'mongodb://127.0.0.1:27017'
  }, {
    staticPath: path.join(__dirname, './public'), // Path to static files
    cookies: {
      secure: false, // Set secure to true if the testing platform is in a different domain and https is being used
      sameSite: '' // Set sameSite to 'None' if the testing platform is in a different domain and https is being used
    },
    devMode: true // Set DevMode to true if the testing platform is in a different domain and https is not being used
  })

// When receiving successful LTI launch redirects to app
lti.onConnect(async (token, req, res) => {
  return res.sendFile(path.join(__dirname, './public/index.html'))
})

// When receiving deep linking request redirects to deep screen
lti.onDeepLinking(async (token, req, res) => {
  return lti.redirect(res, '/deeplink', { newResource: true })
})

// Setting up routes
lti.app.use(routes)

// Setup function
const setup = async () => {
  await lti.deploy({ port: process.env.PORT })

  /**
   * Register platform
   */
await lti.registerPlatform({
    url: 'https://localhost',
    name: 'Moodle',
    clientId: 'ztXWfbnU3uTAP95',
    authenticationEndpoint: 'https://localhost/mod/lti/auth.php',
    accesstokenEndpoint: 'https://localhost/mod/lti/token.php',
    authConfig: { method: 'JWK_SET', key: 'https://localhost/mod/lti/certs.php' }
  }) 
}

setup()