# micro-frontends-earn-app

# Topcoder Earn App

This is a [single-spa](https://single-spa.js.org/) example React microapp.

> NOTE. This application have been configured to be run as child app of a single-spa application. So while this app can be deployed and run independently, we would need some frame [single-spa](https://single-spa.js.org/) which would load it. While technically we can achieve running this app as standalone app it's strongly not recommended by the author of the `single-spa` approch, see this [GitHub Issue](https://github.com/single-spa/single-spa/issues/640) for details.

## Requirements

- node - v10.22.1
- npm - v6.14.6

## NPM Commands

| Command               | Description                                                       |
| --------------------- | ----------------------------------------------------------------- |
| `npm start`           | Run server which serves production ready build from `dist` folder |
| `npm run dev`         | Run app in the `development` mode and `dev` config  |
| `npm run dev-https`   | Run app in the `development` mode and `dev` config using HTTPS protocol |
| `npm run prod`        | Run app in the `development` mode and `prod` config  |
| `npm run build`       | Build app for production and puts files to the `dist` folder, default to `development` mode and `dev` config |
| `npm run analyze`     | Analyze dependencies sizes and opens report in the browser        |
| `npm run lint`        | Check code for lint errors                                        |
| `npm run format`      | Format code using prettier                                        |
| `npm run test`        | Run unit tests                                                    |
| `npm run watch-tests` | Watch for file changes and run unit tests on changes              |
| `npm run coverage`    | Generate test code coverage report                                |

## Local Deployment

Inside the project folder run:
- `nvm use 10.22.1;` - to use npm version: 10.22.1
- `npm i` - install dependencies
- `npm run dev` - run app in `development` mode and `dev` config, currently it is using the config from `default.js`
- As this app can be loaded only inside a frame single-spa, you have to run a `mfe-core` frame app and configure it to use the URL `http://localhost:8008/earn-app/topcoder-micro-frontends-earn-app.js`.

## Local Setup for adding a new MFE
1. The setup is assuming you have setup the `mfe-core` and `micro-frontends-nav-app`. And this is also assuming your have a new MFE named `another-app` and your local url is `http://localhost:8099/another-app/topcoder-micro-frontends-another-app.js`

2. You have launched existing `micro-frontends-challenges-app` and `micro-frontends-gigs-app` in your local envrionment.

3. Modify the `config/dev.js` by incorporating the module mapping, so it might be look like this if you setup all them in local environment:

```
module.exports = {
  MFE_CONFIG: {
    '@topcoder/micro-frontends-another-app': 'http://localhost:8099/another-app/topcoder-micro-frontends-another-app.js',
    '@topcoder/micro-frontends-challenges-app': 'http://localhost:8009/challenges-app/topcoder-micro-frontends-challenges-app.js',
    '@topcoder/micro-frontends-gigs-app': 'http://localhost:8010/gigs-app/topcoder-micro-frontends-gigs-app.js',
  }
};
```
4. In the `src/containers/Menu/index.jsx`, you can modify it to add your new `another-app` menu link, challenges-app and gigs-app menu links have already been setup as reference.

5. In the `set-public-path.js` file, add the mapping to your `another-app`, challenges-app and gigs-app have already been setup as the reference.

6. In the `src/App.jsx` file, add the application mount point inside the `<Router>` component, challenges-app and gigs-app have already been setup as the reference

7. Edit your `hosts` file by mapping `127.0.0.1 local.topcoder-dev.com`

8. Now visit `http://local.topcoder-dev.com:8080/earn/find/challenges` to view the `micro-frontends-challenges-app`

## Deployment to Production

- `npm i` - install dependencies
- `APPMODE=production APPENV=prod npm run build` - build code to `dist/` folder
- Now you can host `dist/` folder using any static server. For example, you may run a simple `Express` server by running `npm start`.

### Deploying to Heroku

Make sure you have [Heroky CLI](https://devcenter.heroku.com/articles/heroku-cli) installed and you have a Heroku account. And then inside the project folder run the next commands:

- If there is not Git repository inited yet, create a repo and commit all the files:

  - `git init`
  - `git add .`
  - `git commit -m'inital commit'`

- `heroku apps:create` - create Heroku app

- `git push heroku master` - push changes to Heroku and trigger deploying

- Now you have to configure frame app to use the URL provided by Heroku like `https://<APP-NAME>.herokuapp.com/earn-app/topcoder-micro-frontends-earn-app.js` to load this microapp.
