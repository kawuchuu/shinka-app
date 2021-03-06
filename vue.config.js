const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const asar = require('asar')
const fs = require('fs-extra')
const { done, info, warn, logWithSpinner, stopSpinner } = require('@vue/cli-shared-utils')

module.exports = {
    pluginOptions: {
        electronBuilder: {
            bundleMainProcess: false,
            customFileProtocol: './',
            builderOptions: {
                // this is so scuffed but it somehow works lmaooo
                afterPack: async context => {
                    info('SHINKA BUILD HOOK')
                    warn('The Shinka bot will fail on Electron < 16 due to discord.js v13 requiring node >= v16.6.0. For the time being, you can run Shinka in dev mode.')
                    info('Current directory: ' + context.appOutDir)
                    logWithSpinner('Extracting app.asar...')
                    asar.extractAll(`${context.appOutDir}/resources/app.asar`, `${context.appOutDir}/resources/app/`)
                    logWithSpinner('Copying Shinka bot node modules...')
                    await fs.copy(`./shinka/node_modules/`, `${context.appOutDir}/resources/app/shinka/node_modules/`)
                    logWithSpinner('Moving ffmpeg executable...')
                    if (process.platform === 'win32') {
                        await fs.move(`${context.appOutDir}/resources/app/shinka/node_modules/ffmpeg-static/ffmpeg.exe`, `${context.appOutDir}/ffmpeg.exe`)
                    } else {
                        await fs.move(`${context.appOutDir}/resources/app/shinka/node_modules/ffmpeg-static/ffmpeg`, `${context.appOutDir}/ffmpeg`)
                    }
                    logWithSpinner('Creating new app.asar archive...')
                    await asar.createPackage(`${context.appOutDir}/resources/app/`, `${context.appOutDir}/resources/app.asar`)
                    logWithSpinner('Cleaning up...')
                    await fs.rm(`${context.appOutDir}/resources/app/`, {recursive: true})
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
        externals: [path.resolve(__dirname, "shinka"), '@discordjs/opus']
    }
}