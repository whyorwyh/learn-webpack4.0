let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
let webpack = require('webpack')
module.exports = {
    optimization: {
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true // set to true if you want JS source maps
          }),
          new OptimizeCSSAssetsPlugin({})
        ]
      },
    devServer: {
        port:8080,
        progress:true,
        contentBase: './dev'
    },
    mode: 'production',
    entry :'./src/index.js',
    output: {
        filename: 'bundle.[hash:8].js',
        path:path.resolve(__dirname, 'dev'),
        // publicPath:'http://www.zhufeng'
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template: './index.html',
            minify: {
                removeAttributeQuotes:true,
                collapseWhitespace: true
            },
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        // new webpack.ProvidePlugin({
        //     $: 'jquery'
        // })
    ],
    // externals: {
    //     jquery: '$'
    // },
    module:{
       rules:[
        {
            test: /\.html$/,
            use:'html-withimg-loader'
        },
        // {
        //     test: require.resolve('jquery'),
        //     use:'expose-loader?$'
        // },
        // {
        //     test:/\.js$/,
        //     use: {
        //         loader: 'eslint-loader',
        //         options:{
        //             enforce: 'pre'
        //         }
        //     }
        // },
        {
            test:/\.js$/,
            use:{
                loader:'babel-loader',
                options:{
                    presets: [
                        '@babel/preset-env'
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                        '@babel/plugin-transform-runtime'
                    ]
                }
            },
            include:path.resolve(__dirname, 'src'),
            exclude: /node_modules/
        },
        {
            test:/\.css$/,
            use:[
                MiniCssExtractPlugin.loader, 
                'css-loader',
                'postcss-loader'
            ]
        },
        {
            test:/\.less$/,
            use:[
                MiniCssExtractPlugin.loader, 
                'css-loader', 'postcss-loader', 'less-loader'
            ]
        },
        {
            test:/\.(png|jpg|gif)$/,
            use:{
                loader:'url-loader',
                options: {
                    limit: 1,
                    outputPath: '/img/',
                    publicPath:'http://www.zhufeng'
                }
            }
        },
       ]
    }
}