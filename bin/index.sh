#!/bin/bash

# const argv = process.argv.slice(2);
# require('../lib').exec(...argv);

function _color_()
{
    case "$1" in
        red)    nn="31";;
        green)  nn="32";;
        yellow) nn="33";;
        blue)   nn="34";;
        purple) nn="35";;
        cyan)   nn="36";;
    esac
    ff=""
    case "$2" in
        bold)   ff=";1";;
        bright) ff=";2";;
        uscore) ff=";4";;
        blink)  ff=";5";;
        invert) ff=";7";;
    esac
    color_begin=`echo -e -n "\033[${nn}${ff}m"`
    color_end=`echo -e -n "\033[0m"`
    while read line; do
        echo "${color_begin}${line}${color_end}"
    done
}

help() {
    echo Usage:
    echo
    echo -e '  ' ycs start \$project_dir
    echo -e '  ' ycs serve
    echo -e '  ' ycs build
    echo -e '  ' ycs add api
    echo -e '  ' ycs rm api \$apiName
    echo -e '  ' ycs add plugin \$pluginName [\$version]
    echo -e '  ' ycs rm plugin \$pluginName [\$version]
    echo -e '  ' ycs add rest-admin
    echo -e '  ' ycs rm rest-admin \$modelName
    echo
    echo More info at https://github.com/yc-server/cli.git
}

start() {
    if [ "$1" = "" ]; then
        echo Usage: ycs start \$project_dir | _color_ cyan
        return
    fi

    if [ -e $1 ]; then
        echo Directory $1 already exists | _color_ red
        return
    fi
    
    templatePath=`npm root -g`/@ycs/cli/templates
    if [ -e $templatePath ]; then
        cp -r $templatePath/start $1
        cd $1 && yarn
    fi
}

addPlugin() {
    if [ "$1" = "" ]; then
        echo Usage: ycs add plugin pluginName [version] | _color_ cyan
        return
    fi

    if [ "$2" = "" ]; then
        echo yarn add ycs-plugin-$1
        yarn add ycs-plugin-$1
    else
        yarn add ycs-plugin-$1@$2
    fi

    if [ -e src/plugins/$1.ts ]; then
        echo Plugin already added | _color_ red
        return
    fi

    mkdir -p src/plugins
    cp node_modules/ycs-plugin-$1/default_config src/plugins/$1.ts
    echo src/plugins/$1.ts | _color_ green
    
    if [ -e node_modules/ycs-plugin-$1/setup.sh ]; then
        sh node_modules/ycs-plugin-$1/setup.sh
    fi
}

addAPI() {
    local model=sample
    printf "Model ($model): "
    read x
    if [ "$x" != "" ]; then
        model=$x
    fi

    local endpoint=/api/${model}s
    printf "Endpoint ($endpoint): "
    read x
    if [ "$x" != "" ]; then
        endpoint=$x
    fi

    targetPath=src/api/$model
    if [ -e $targetPath ]; then
        echo API $model already exists | _color_ red
        return
    fi

    templatePath=`npm root -g`/@ycs/cli/templates
    if [ -e $templatePath ]; then
        mkdir -p $targetPath
        cp $templatePath/rest/controller.ts $targetPath/controller.ts
        sedString=s/\<ENDPOINT\>/${endpoint//\//\\\/}/g
        sed $sedString $templatePath/rest/router.ts > $targetPath/router.ts
        sedString=s/\<MODEL\>/${model//\//\\\/}/g
        sed $sedString $templatePath/rest/model.ts > $targetPath/model.ts
        echo $targetPath/controller.ts | _color_ green
        echo $targetPath/model.ts | _color_ green
        echo $targetPath/router.ts | _color_ green
    fi
}

addRestAdmin() {
    local model=sample
    printf "Model ($model): "
    read x
    if [ "$x" != "" ]; then
        model=$x
    fi

    local endpoint=/api/${model}s
    printf "Endpoint ($endpoint): "
    read x
    if [ "$x" != "" ]; then
        endpoint=$x
    fi

    targetPath=src/app/$model
    if [ -e $targetPath ]; then
        echo Rest Admin $model already exists | _color_ red
        return
    fi

    templatePath=`npm root -g`/@ycs/cli/templates
    modelCapitalized="$(tr '[:lower:]' '[:upper:]' <<< ${model:0:1})${model:1}"
    if [ -e $templatePath ]; then
        mkdir -p $targetPath
        cp $templatePath/rest-admin/component.html $targetPath/$model.component.html
        cp $templatePath/rest-admin/component.scss $targetPath/$model.component.scss
        cp $templatePath/rest-admin/component.ts $targetPath/$model.component.ts
        cp $templatePath/rest-admin/routing.module.ts $targetPath/$model-routing.module.ts
        sedEndpoint=s/\<ENDPOINT\>/${endpoint//\//\\\/}/g
        sed $sedEndpoint $templatePath/rest-admin/component.ts > $targetPath/$model.component.tmp.1.ts
        sedModel=s/\<MODEL\>/${model//\//\\\/}/g
        sed $sedModel $templatePath/rest-admin/module.ts > $targetPath/$model.module.tmp.2.ts
        sed $sedModel $targetPath/$model.component.tmp.1.ts > $targetPath/$model.component.tmp.2.ts
        sed $sedModel $templatePath/rest-admin/routing.module.ts > $targetPath/$model-routing.module.tmp.2.ts
        sedModelCapitalized=s/\<MODEL_CAPITALIZED\>/${modelCapitalized//\//\\\/}/g
        sed $sedModelCapitalized $targetPath/$model.module.tmp.2.ts > $targetPath/$model.module.ts
        sed $sedModelCapitalized $targetPath/$model.component.tmp.2.ts > $targetPath/$model.component.ts
        sed $sedModelCapitalized $targetPath/$model-routing.module.tmp.2.ts > $targetPath/$model-routing.module.ts
        rm $targetPath/$model.component.tmp.1.ts
        rm $targetPath/$model.module.tmp.2.ts
        rm $targetPath/$model.component.tmp.2.ts
        rm $targetPath/$model-routing.module.tmp.2.ts
        echo $targetPath/$model.component.html | _color_ green
        echo $targetPath/$model.component.scss | _color_ green
        echo $targetPath/$model.component.ts | _color_ green
        echo $targetPath/$model.module.ts | _color_ green
        echo $targetPath/$model-routing.module.ts | _color_ green
    fi
}

add() {
    case $1 in
        "plugin" )
            shift
            addPlugin $@;;
        "api" )
            shift
            addAPI $@;;
        "rest-admin" )
            shift
            addRestAdmin $@;;
        * )
            help;;
    esac
}

removePlugin() {
    if [ "$1" = "" ]; then
        echo Usage: ycs rm plugin \$pluginName | _color_ cyan
        return
    fi

    yarn remove ycs-plugin-$1

    if [ -e src/plugins/$1.ts ]; then
        echo rm src/plugins/$1.ts | _color_ yellow
        rm src/plugins/$1.ts
    else
        echo File src/plugins/$1.ts does NOT exist.
    fi
}

removeAPI() {
    if [ "$1" = "" ]; then
        echo Usage: ycs rm api \$apiName | _color_ cyan
        return
    fi

    echo rm -rf src/api/$1 | _color_ yellow
    rm -rf src/api/$1
}

removeRestAdmin() {
    if [ "$1" = "" ]; then
        echo Usage: ycs rm rest-admin \$modelName | _color_ cyan
        return
    fi

    echo rm -rf src/app/$1 | _color_ yellow
    rm -rf src/app/$1
}

remove() {
    case $1 in
        "plugin" )
            shift
            removePlugin $@;;
        "api" )
            shift
            removeAPI $@;;
        "rest-admin" )
            shift
            removeRestAdmin $@;;
        * )
            help;;
    esac
}

case $1 in
    "-v" )
        echo 0.2.2;;
    "--version" )
        echo 0.2.2;;
    "start" )
        shift
        start $@;;
    "serve" )
        npm run serve;;
    "build" )
        npm run build;;
    "add" )
        shift
        add $@;;
    "rm" )
        shift
        remove $@;;
    * ) 
        help;;
esac

