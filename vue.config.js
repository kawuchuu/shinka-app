const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const asar = require('asar')
const fs = require('fs-extra')
const { done, info, logWithSpinner, stopSpinner } = require('@vue/cli-shared-utils')

module.exports = {
    pluginOptions: {
        electronBuilder: {
            bundleMainProcess: false,
            customFileProtocol: './',
            builderOptions: {
                // this is so scuffed but it somehow works lmaooo
                afterPack: async context => {
                    info('SHINKA BUILD HOOK')
                    info('Current directory: ' + context.appOutDir)
                    logWithSpinner('Extracting app.asar...')
                    asar.extractAll(`${context.appOutDir}/resources/app.asar`, `${context.appOutDir}/resources/app/`)
                    logWithSpinner('Copying Shinka bot node modules...')
                    fs.copySync(`./shinka/node_modules/`, `${context.appOutDir}/resources/app/shinka/node_modules/`)
                    logWithSpinner('Moving ffmpeg executable...')
                    if (process.platform === 'win32') {
                        fs.moveSync(`${context.appOutDir}/resources/app/shinka/node_modules/ffmpeg-static/ffmpeg.exe`, `${context.appOutDir}/ffmpeg.exe`)
                    } else {
                        fs.moveSync(`${context.appOutDir}/resources/app/shinka/node_modules/ffmpeg-static/ffmpeg`, `${context.appOutDir}/ffmpeg`)
                    }
                    logWithSpinner('Creating new app.asar archive...')
                    await asar.createPackage(`${context.appOutDir}/resources/app/`, `${context.appOutDir}/resources/app.asar`)
                    logWithSpinner('Cleaning up...')
                    fs.rmSync(`${context.appOutDir}/resources/app/`, {recursive: true})
                    stopSpinner(true)
                    done('Continuing build...')
                }
            }
        }
    },
    configureWebpack: {
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: `./shinka`, to: 'shinka' },
                    { from: './src/preload.js', to: 'preload.js' }
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