import path from 'path'
import nodeExternals from 'webpack-node-externals'

const configCreator = () => ({
  target: 'web',
  entry: {
    'dagre-d3': './index.js'
  },
  output: {
    path: path.join(__dirname, 'build', 'dist'),
    filename: '[name].bundle.js',
    library: 'dagreD3',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', { targets: { browsers: ['last 3 versions'] } }]
            ]
          }
        }
      }
    ]
  }
})

const config = configCreator()
const coreConfig = configCreator()

coreConfig.externals = [nodeExternals()]
coreConfig.output.filename = '[name].core.bundle.js'

export default [config, coreConfig]
