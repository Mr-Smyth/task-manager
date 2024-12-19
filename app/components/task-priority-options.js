import Component from '@glimmer/component';

export default class TaskPriorityOptionsComponent extends Component {
  // Default value passed in from the parent or fallback to 'new'
  get defaultPriority() {
    return this.args.currentPriority || 'low';
  }

  // Predefined options for the priority dropdown
  get priorityOptions() {
    return ['low', 'normal', 'high', 'urgent'];
  }
}
