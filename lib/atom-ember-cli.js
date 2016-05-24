'use babel';

import EmberCliConfig from './ember-cli-config';
import { CompositeDisposable } from 'atom';

class AtomEmberCli {
  constructor() {
    this.subscriptions = null;
  }

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.emberCliConfig = new EmberCliConfig
    this.subscriptions = new CompositeDisposable
    const commands = atom.commands.add('atom-workspace', {
      'atom-ember-cli:cycle': () => this.cycle()
    });

    this.subscriptions.add(commands);
  }

  deactivate() {
    return this.subscriptions.dispose();
  }

  activePanePath() {
    activePane = atom.workspace.getActivePaneItem();
    return activePane.getDirectoryPath() + "/" + activePane.getFileName();
  }

  cycle() {
    console.log(this.emberCliConfig.usesPodStructure());
    this.activePanePath()
  }
}

const atomEmberCli = new AtomEmberCli();
export const activate = () => atomEmberCli.activate();
export const deactivate = () => atomEmberCli.deactivate();
