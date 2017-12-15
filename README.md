# Installation
```
npm i -g @ycs/cli
```

# Usage

> Initialize project
```
ycs start $project_dir
```

> Run local server
```
ycs serve
```

> Build project
```
ycs build
```

> Deploy project
```
ycs deploy
```

> Help
```
ycs help
```

## Restful API

> Add a restful API endpoint
```
ycs add api
```

> Remove a restful API
```
ycs rm api $apiName
```

## Plugins

> Add a plugin
```
ycs add plugin $pluginName [$version]
```

> Remove a plugin
```
ycs rm plugin $pluginName [$version]
```

## Rest Admin

> Add a Rest Admin
```
ycs add rest-admin
```

> Remove a Rest Admin
```
ycs rm rest-admin $modelName
```