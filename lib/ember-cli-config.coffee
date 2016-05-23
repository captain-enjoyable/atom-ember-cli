fs = require 'fs'
commentedJson = require('comment-json')

module.exports =
class EmberCliConfig
  constructor: ->
    @pathToConfig = atom.project.getPaths()[0] + "/.ember-cli"

  isEmberProject: ->
    fs.existsSync(@pathToConfig)

  config: ->
    if @config
      return @config

    contents = fs.readFileSync(@pathToConfig)
    @config = commentedJson.parse(contents)

  usesPodStructure: ->
    @config.usePods
