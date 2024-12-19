// app/components/task-status-options.js
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class TaskStatusOptionsComponent extends Component {
  //   // This action will notify the parent when the user selects a status
  //   @action
  //   handleSelect(event) {
  //     const selectedValue = event.target.value;
  //     console.log(selectedValue, " = Selected value in component class handleSelect action")
  //     this.args.onSelect(selectedValue);  // Notify parent about the selected value
  //   }


  // Default value passed in from the parent or fallback to 'new'
  get defaultStatus() {
    return this.args.currentStatus || 'new';
  }

  // Predefined options for the status dropdown
  get statusOptions() {
    return ['new', 'in-triage', 'in-review', 'in-progress', 'on-hold', 'done'];
  }
}
