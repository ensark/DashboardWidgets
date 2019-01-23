# SticosDashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `npm install` or `yarn` to install dependencies.

Run `ng serve` for serving a demo app (inside /apps/demo). Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files (both demo and library).

## Development flow

Everything (fix or feature to the lib) should be done on separate branch branched from development. Once you are done, please rebase your branch to current development and resolve your conflicts before issuing an PR. Commit messages sould be per [these](https://github.com/conventional-changelog/standard-version#commit-message-convention-at-a-glance) instructions. This is making sure that `CHANGELOG.md` is generated correctly once we decide to publish a new version.

Following workspaces are available:
 - `projects/sticos-widgets` - place where libraries are found
 - `src` - place where you can consume your library to test it in demo app before you release a version

To get a new version of the NPM package create a PR towards the master branch.

## Development commands

This library scripts inside template is compatible with both `yarn` and `npm run`.

# Script list:

 - `build:lib` - building a library without publishing it (results are in `sticos-widgets` folder)
 - `compodoc` - generate documentation (results are in `documentation` folder, read [here](https://github.com/compodoc/compodoc) for more details how to document components)

## Peer-dependencies

There is no sense that our library will ever need a strong dependency (project.json located in `projects/sticos-widgets/`). Instead, list everything you need in peerDependencies (inversion of control, consuming apps should install those dependencies, and npm/yarn will warn if those are missing). Also please add those peer dependencies in installation guide [here](http://tfs-2015:8080/tfs/DefaultCollection/Sticos%20NPM/_git/sticos-npm.widgets), unless they are normal @angular dependencies.
