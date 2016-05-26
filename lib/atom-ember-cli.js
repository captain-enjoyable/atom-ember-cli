'use babel';

import EmberCliConfig from './ember-cli-config';
import FileCycler from './ember-file-cycler';
import { CompositeDisposable } from 'atom';

class AtomEmberCli {
  constructor() {
    this.subscriptions = null;
  }

  activate(state) {
    this.emberCliConfig = new EmberCliConfig
    if (this.emberCliConfig.isEmberProject()) {
      this.subscriptions = new CompositeDisposable
      const commands = atom.commands.add('atom-workspace', {
        'atom-ember-cli:cycle': () => this.cycle()
      });

      this.subscriptions.add(commands);
    }
  }

  deactivate() {
    return this.subscriptions.dispose();
  }

  cycle() {
    let fileCycler = new FileCycler(this.emberCliConfig);
    fileCycler.cycle();
  }
}

const atomEmberCli = new AtomEmberCli();
export const activate = () => atomEmberCli.activate();
export const deactivate = () => atomEmberCli.deactivate();
