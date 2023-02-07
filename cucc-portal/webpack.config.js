
module.exports = {

    module: {
        rules: [
            {
                test: /\.(jpg|png|eot|svg|ttf|woff|woff2|gif|TTF)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000, //4096字节以上生成文件，否则base64
                    name: '[name].[ext]'
                }
            }
        ]
    }
}