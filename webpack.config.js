var path = require('path')
var webpack = require('webpack')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');  //分离css单独打包插件
var HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html模版文件
// const { VueLoaderPlugin } = require('vue-loader/lib/plugin');

module.exports = {
    entry: './src/main.js',//值可以是字符串、数组或对象（设置主程序入口文件）
    output: {
        path: path.resolve(__dirname, './dist'),//Webpack结果存储
        // publicPath: '/dist/',//懵懂，懵逼，//然而“publicPath”项则被许多Webpack的插件用于在生产模式和开发模式下下更新内嵌到css、html，img文件里的url值
        filename: 'js/[name].[hash:8].js', // 设置打包之后的js文件名（加hash值是为了解决浏览器对相同js文件名不重新加载的问题）
    },
    module: {
        // 设置对不同文件进行打包的规则
        rules: [
            // 对.vue文件进行打包规则定义
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader',
            },
            // 对.js文件进行打包规则定义
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
               
            },
            // 对图片进行打包规则定义（添加hash值的作用同上）
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            // 对.css,.scss文件进行打包规则定义
            {
                test: /\.(scss|css)$/,
                use:ExtractTextWebpackPlugin.extract({use: ['css-loader', 'sass-loader'], fallback: 'style-loader',})
            },
            // 对项目中的其他文件进行打包规则定义
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use:[
                    {loader:'file-loader',options:{name:'fonts/[name].[hash:8].[ext]'}}//项目设置打包到dist下的fonts文件夹下
                ]
            },
        ]
    },
    // 插件
    plugins: [
        // 设置css文件
        new ExtractTextWebpackPlugin('[name].[hash:8].css'),
        // 设置html
        new HtmlWebpackPlugin({
            template: './index.html',
            //filename: 'index.html',
            title: '氧歌',
            //inject:true,  //所有静态资源css和JavaScript都不会自动注入到模板文件中，此处我们手动在html中添加
        }),
        // 进行实例初始化
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery"
        }),
    ],
    // 解析
    resolve: {
        // 创建import或require的别名，来确保模块引入变得更简单
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {//webpack-dev-server配置
        // 打包后文件的路由
        contentBase: path.join(__dirname, "./dist"),
        historyApiFallback: true,//不跳转
        noInfo: true, //启用 noInfo 后，诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
        inline: true,//实时刷新
        port: 1234, // 端口号
    },
    performance: {
        // hints 打开/关闭提示。此外，当找到提示时，告诉 webpack 抛出一个错误或警告。此属性默认设置为 "warning"
        hints: false //给定一个创建后超过 250kb 的资源：
    },
    devtool: '#eval-source-map' //每个模块使用 eval() 执行，并且 SourceMap 转换为 DataUrl 后添加到 eval() 中。初始化 SourceMap 时比较慢，但是会在重构建时提供很快的速度，并且生成实际的文件。行数能够正确映射，因为会映射到原始代码中。
}