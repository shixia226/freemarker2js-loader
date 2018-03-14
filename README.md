# freemarker2js-loader

webpack loader for freemarker2js 

## Install

  - `npm install freemarker2js-loader --save-dev`

## How to use

#### webpack config
```javascript
rules: [{
    test: /\.ftl$/,
    use: {
        loader: 'freemarker2js-loader'
    }
}
```

#### options
 - format: ```function(js, freemarker2js) {}```
    > You can further formatting the JS string that is formed by the transformation.

## LICENSE
MIT
