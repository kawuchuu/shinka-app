const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const asar = require('asar')
const fs = require('fs-extra')

module.exports = {
    pluginOptions: {
        electronBuilder: {
            bundleMainProcess: false,
            customFileProtocol: './',
            builderOptions: {
                // this is so scuffed but it somehow works lmaooo
                afterPack: async context => {
                    console.log('Current directory: ' + context.appOutDir)
                    asar.extractAll(`${context.appOutDir}/resources/app.asar`, `${context.appOutDir}/resources/app/`)
                    fs.copySync(`./shinka/node_modules/`, `${context.appOutDir}/resources/app/shinka/node_modules/`)
                    if (process.platform === 'win32') {
                        fs.moveSync(`./shinka/node_modules/ffmpeg-static/ffmpeg.exe`, `${context.appOutDir}/ffmpeg.exe`)
                    } else {
                        fs.moveSync(`./shinka/node_modules/ffmpeg-static/ffmpeg`, `${context.appOutDir}/ffmpeg`)
                    }
                    await asar.createPackage(`${context.appOutDir}/resources/app/`, `${context.appOutDir}/resources/app.asar`)
                    fs.rmSync(`${context.appOutDir}/resources/app/`, {recursive: true})
                }
            }
        }
    },
    configureWebpack: {
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: `./shinka`, to: 'shinka' },
                ]
            })
        ],
/*         module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                      'vue-style-loader',
                      'css-loader',
                      'sass-loader'
                    ]
                  }
            ]
        }, */
        externals: [path.resolve(__dirname, "shinka"), '@discordjs/opus']
    }
}