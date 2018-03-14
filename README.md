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

#### freemarker (demo.ftl)
```html
<#--begin city -->
<a <#if link??>href="${link}"</#if>>
<div class="address">${address}</div>
<div class="pop">
    <#--begin aggre -->
        <span>${count}</span><div>${label}</div>
    <#--end aggre -->
    <#if price != ''>
    <div class="price">${price}</div>
    </#if>
</div>
</a>
<#--end city -->
```
*NOTICE: the "```<#--begin {name} -->```" and "```<#--end {name} -->```" must appear in pairs, and the names behind must be consistent, allowing nesting.

#### javascript
```javascript
import Aggre from 'demo.ftl?part=aggre';
import City from 'demo.ftl?part=city';

$('.aggre').html(Aggre({
    count: 226,
    label: 'freemarker2js'
}));
```
*NOTICE: If the "```es6```" property in webpack is FALSE, you can encode the "```var Aggre = require('demo.ftl?part=aggre')```" to export the function

#### options
 - format: ```function(js, freemarker2js) {}```
    > You can further formatting the JS string that is formed by the transformation.

 - es6: ```true```
    > The default export format is "```export default ...```", when this property is set to ```true```, the export format is "```module.exports = ...```".

## LICENSE
MIT
