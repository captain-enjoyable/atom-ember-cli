fs = require 'fs'

module.exports =
class EmberFileCycler
  constructor: (config) ->
    @config = config
