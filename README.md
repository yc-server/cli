[![Build Status](https://travis-ci.org/yc-server/cli.svg?branch=master)](https://travis-ci.org/yc-server/cli.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/yc-server/cli/badge.svg?branch=master)](https://coveralls.io/github/yc-server/cli?branch=master)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# Introduction
This is a cli tool for Ycs project.
More info about [@ycs-core](https://github.com/yc-server/core)
To see the project structure here [@ycs-base](https://github.com/yc-server/base)

# Installation
```
npm i -g @ycs/cli
```

# Usage

> Help
```
ycs --help
```

> Initialize project
```
ycs --new
```

## Restful API

> Add a restful API endpoint
```
ycs --api-add
```

## Plugins

> Add a plugin
```
ycs --plugin-add
```

> Remove a plugin
```
ycs --plugin-remove
```

## Test and deploy

> Run local server
```
npm run serve
```

> Build project
```
npm run build
```

> Deploy project
```
npm run deploy
```