const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
let OptimizeCss = require("optimize-css-assets-webpack-plugin");

// 如果预先定义过环境变量，就将其赋值给`ASSET_PATH`变量，否则赋值为根目录
const ASSET_PATH =  '/';

//cesium
const cesiumSource = "node_modules/cesium/Source";
const cesiumWorkers = "../Build/Cesium/Workers";

module.exports = {
    optimization:{ //优化项
        minimizer: [
            new UglifyJsPlugin({
                cache: true
                , parallel: true //并发打包
                , sourceMap: true//源码映射
            })
            ,new OptimizeCss()
        ]
    },

    mode: "development",
    devServer: {//开发服务器的配置
        port: 3000,
        progress: true,
        contentBase: "./build",
        compress: true,
        open: true
    },
    devtool: "eval-source-map", //源码映射
    entry: {
        app: "./src/index.js"
    },
    output:{
        filename: "[name].js",
        path: path.resolve(__dirname, "build"),
        // Needed to compile multiline strings in Cesium
        sourcePrefix: ""
    },
    amd:{
        // Enable webpack-friendly use of require in Cesium
        toUrlUndefined: true
    },
    node: {
        // Resolve node module use of fs
        fs: 'empty'
    },
    resolve: {
        alias: {
            // CesiumJS module name
            cesium: path.resolve(__dirname, cesiumSource)
        }
    },
    module:{
        rules: [{
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        },{
            test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
            use: [ 'url-loader' ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html"
        }),
        //拷贝静态文件
        // Copy Cesium Assets, Widgets, and Workers to a static directory
        new CopyWebpackPlugin([ { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' } ]),
        new CopyWebpackPlugin([ { from: path.join(cesiumSource, 'Assets'), to: 'Assets' } ]),
        new CopyWebpackPlugin([ { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' } ]),
        new webpack.DefinePlugin({
            // Define relative base path in cesium for loading assets
            //定义基础目录用于加载cesium资源
            CESIUM_BASE_URL: JSON.stringify('./')
        }),

    ]
};
