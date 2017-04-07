# [github-client](https://github.com/pgaines937/github-client)

This GitHub Client is implemented using [Electron](http://electron.atom.io/), [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/).

The app is based on the [react-redux-starter-kit](https://github.com/cloudmu/react-redux-starter-kit). I stripped out all of the functionality except for the repositories page in order to simplify implementation of searching for a repository.

I then ported in the package.json and electron builder configuration files from [electron-react-redux-boilerplate](https://github.com/jschr/electron-react-redux-boilerplate).

Then I implemented a SearchForm component using Redux Form that upon submission modifies the parameters supplied to the GitHub API call, in order to return a filtered list of repositories.

Finally, I implemented a series of unit tests for actions and reducers using Jest.

This application demonstrates asynchronous data fetching, caching and pagination, etc. using the technologies listed below.

Scroll down to find out how to [run the application](#getting-started) yourself.
Here's a screenshot:

![alt text](https://github.com/pgaines937/github-client/blob/master/screenshot.png "Screenshot")

## Technologies used:

- [React](https://github.com/facebook/react)
- [Redux](https://github.com/rackt/redux)
- [React Router](https://github.com/rackt/react-router)
- [Redux Form](https://github.com/erikras/redux-form/)
- [Jest](https://github.com/facebook/jest)
- [Bootstrap](https://github.com/twbs/bootstrap)
- [JSON Web Token](https://jwt.io/)
- [create-react-app](https://github.com/facebookincubator/create-react-app/)
- [Babel](http://babeljs.io/) and [Webpack](http://webpack.github.io/) (now behind the scenes thanks to create-react-app)
- [Electron](https://github.com/electron/electron)
- [Electron Builder](https://github.com/electron-userland/electron-builder)
- [Electron DevTools Installer](https://github.com/MarshallOfSound/electron-devtools-installer)

## Feature highlights:

#### Best React Practice - [Separating "smart" and "dumb" components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

This design pattern makes even more sense when using React along with Redux, where top-level smart components (a.k.a. containers in this codebase such as `ReposPage`) subscribe to Redux state and dispatch Redux actions, while low level components (such as `SearchForm`, `Repo`, and `Header`) read data and invoke callbacks passed in as props.

#### Async Data Fetching with Caching and Pagination

The `ReposPage` would by default show most starred Github repos (with 10000+ stars). The async actions (see `repos` under actions) fetch data from the following Github API:

-  `https://api.github.com/search/repositories?q=stars:>10000&order=desc&page=1`

The fetched data are stored with the page number as the lookup key, so that the local copy can be shown without the need to re-fetch the same data remotely each time. However cached data can be invalidated if desired.

#### Error Handling while Fetching Data

You can test this by disabling your internet connection. Or even better, you can page through `ReposPage` very quickly and hopefully invoke Github's API rate limit for your IP address.
The application would fail gracefully with the error message if data fetching (for a particular page) fails. However, the application can still show cached data for other pages, which is very desirable behavior.

## Getting Started
Thanks to [create-react-app](https://github.com/facebookincubator/create-react-app), we would  have a configuration-free dev experience.
However, we are also using Electron to package and deploy the application, which does require some configuration (most of which is already done at this point).

To get started, please clone this git repository and then run `npm install` once under the project top-level directory.

```
git clone https://github.com/pgaines937/github-client
cd react-redux-starter-kit
npm install
```
This will install the dependencies for the client side.

**You’ll need to have Node installed on your machine**. (Node >= 6 and npm >= 3 are recommended).

## While You're Developing...
Whenever you want to run/test the program, `cd` to the project top-level directory. Use these commands:

### `npm start`

Runs the app in the development mode, using the Webpack-provided "development server".<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.<br>

### `npm run electron-dev`

This starts the electron client in development mode and points it to http://localhost:3000 in order to simulate the user experience while using the electron desktop application.<br>

### `npm run test:watch`

This uses jest to track any code changes and run all the unit tests.

### `npm run react-build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run react-eject`

Note: `eject` is an advanced `create-react-app` tool. Read the [how-to](https://github.com/facebookincubator/create-react-app/blob/master/template/README.md) for details.



## How Do I ... ?

This project was ported to use [create-react-app](https://github.com/facebookincubator/create-react-app) and [electron-builder](https://github.com/electron-userland/electron-builder) for handling all assets.
Many questions are answered in their READMEs: [create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/template/README.md) | [create-react-app](https://github.com/electron-userland/electron-builder/blob/master/README.md).
