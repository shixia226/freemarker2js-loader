var freemarker = require('freemarker2js');
var regQuery = /part=([\w-]+)/i;

/**
 * 返回指定ftl模板的解析器, 并且可以通过require('xxx.ftl?part=partA')的形式返回指定ftl文件中模板片段partA的解析器
 * part片段的标记格式为 
 * ...
 * <#--begin partA -->
 *   <div>target template</div>
 * <#--end partA -->
 * ...
 * 解析器依赖freemarker.js, 解析器是一个方法function(context){}, 传入数据后可以返回解析后的结果
 */
function ftl2func(template, query, options) {
    var m = query.match(regQuery);
    if (m) {
        var part = m[1];
        var regexPart = new RegExp('<#--begin\\s+' + part + '\\s+-->([\\s\\S]*)<#--end\\s+' + part + '\\s+-->');
        var mPart = template.match(regexPart);
        if (mPart) {
            template = mPart[1];
        } else {
            throw new Error('freemarker part [' + part + '] not found.');
        }
    }
    var jsString = (options.es6 !== false ? 'export default ' : 'module.exports = ') + freemarker(template);
    if (typeof options.format === 'function') {
        jsString = options.format(jsString, freemarker)
    }
    return jsString;
}
module.exports = function(source) {
    this.cacheable();
    return ftl2func(source, this.resourceQuery, (this.query || {}));
}

module.exports = ftl2func;