// app/components/create-user-modal.js
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ModalComponent extends Component {
  // Handle closing the modal
  /* If (click on backdrop, or close button)
        Call the passed onClose function that triggers the toggleModel in users controller */
  @action
  closeModal() {
    this.args.onClose();
  }
}
