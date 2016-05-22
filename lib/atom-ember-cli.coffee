AtomEmberCliView = require './atom-ember-cli-view'
fs = require 'fs'
path = require 'path'

{ CompositeDisposable } = require 'atom'
{ File } = require 'atom'

module.exports = AtomEmberCli =
  atomEmberCliView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @atomEmberCliView = new AtomEmberCliView(state.atomEmberCliViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @atomEmberCliView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable
    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'atom-ember-cli:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @atomEmberCliView.destroy()

  serialize: ->
    atomEmberCliViewState: @atomEmberCliView.serialize()

  isEmberProject: ->
    fs.existsSync(atom.project.getPaths()[0] + "/.ember-cli")

  activePanePath: ->
    activePane = atom.workspace.getActivePaneItem()
    activePane.getDirectoryPath() + "/" + activePane.getFileName()

  toggle: ->
    @activePanePath()
