
const entry = require('./entry')
const path = require('path')

module.exports={
    devtool: '#source-map',
    mode: 'development',
    context: path.resolve (__dirname, '../'),
    entry: entry,
    output:{
        filename:'[name].js',
        path: path.resolve (__dirname, '../lib')
    },
    module:{
        rules:[
             {
                test:/\.tsx?$/,
                use:{
                    loader:'ts-loader'
                }
             }
        ]
    }
}