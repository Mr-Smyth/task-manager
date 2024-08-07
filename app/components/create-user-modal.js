// app/components/create-user-modal.js
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class CreateUserModalComponent extends Component {
    // Handle closing the modal
    // if click on backdrop, or close button or form is submitted
  @action
  closeModal() {
    this.args.onClose();
  }

  @action
  createUser(event) {
    event.preventDefault();
    
    // get the form values from the event target
    const userName = event.target.userName.value;
    const userDescription = event.target.userDescription.value;

    // log them for now
    console.log("Creating a user with name =", userName);
    console.log("Creating a user with description =", userDescription);

    // next steps:
    // - Pass these values to an action or service to handle user creation
    // - e.g: this.args.createUser(userName, userDescription)
    // - How to do this from the component - should the user controller handle this?
    // - perhaps handle it in a service that updates users and could also be used for deletion and editing?


    // Close the modal after creating the user
    this.closeModal(); 
  }
}
