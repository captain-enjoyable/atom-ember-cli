EmberCliConfig = require './ember-cli-config'

{ CompositeDisposable } = require 'atom'

module.exports = AtomEmberCli =
  subscriptions: null

  activate: (state) ->
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @emberCliConfig = new EmberCliConfig
    @subscriptions = new CompositeDisposable
    @subscriptions.add atom.commands.add 'atom-workspace', 'atom-ember-cli:toggle': => @toggle()

  deactivate: ->
    @subscriptions.dispose()

  serialize: ->
    # atomEmberCliViewState: @atomEmberCliView.serialize()

  activePanePath: ->
    activePane = atom.workspace.getActivePaneItem()
    activePane.getDirectoryPath() + "/" + activePane.getFileName()

  toggle: ->
    @emberCliConfig.usesPodStructure()
    @activePanePath()
