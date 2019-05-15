const markdownItContainer = require('markdown-it-container')
const markdownRender = require('markdown-it')()

const vueMarkdownOptions = {
    raw: true,
    preprocess: (MarkdownIt, source) => {
        // table add class table
        MarkdownIt.renderer.rules.table_open = function () {
            return '<table class="table">'
        }
        // ```code``` add class code_inline
        const code_inline = MarkdownIt.renderer.rules.code_inline
        MarkdownIt.renderer.rules.code_inline = function (...args) {
            args[0][args[1]].attrJoin('class', 'code_inline')
            return code_inline(...args)
        }
        return source
    },
    use: [
        [markdownItContainer, 'demo', {
            validate: function (params) {
                return params.trim().match(/^demo\s*(.*)$/)
            },
            render: function (tokens, idx) {
                if (tokens[idx].nesting === 1) {
                    let demoInfo = tokens[idx].info.trim().match(/^demo\s+(.*)$/)
                    let description = (demoInfo && demoInfo.length > 1) ? demoInfo[1] : ''
                    let descriptionHTML = description ? markdownRender.render(description) : ''
                    let content = tokens[idx + 1].content
                    return `<demo-block><div class="source" slot="source">${content}</div>${descriptionHTML}<div class="highlight" slot="highlight">`
                } else {
                    return '</div></demo-block>\n'
                }
            }
        }]
    ]
}

module.exports = {
    pages: {
        index: {
            entry: './examples/main.js'
        }
    },
    chainWebpack: config => {
        config.module
        .rule('md')
        .test(/\.md$/)
        .use('vue-loader')
        .loader('vue-loader')
        .end()
        .use("vue-markdown-loader")
        .loader('vue-markdown-loader/lib/markdown-compiler')
        .options(vueMarkdownOptions)
        .end()
    }
}
