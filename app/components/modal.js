import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ModalComponent extends Component {
  // Handle closing the modal
  @action
  closeModal() {
    this.args.onClose();
  }
}
