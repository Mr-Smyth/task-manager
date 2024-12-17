import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class TaskOptionsComponent extends Component {
  @action
  handleSelect(event) {
    const selectedValue = event.target.value;
    // Calling the action passed from parent
    this.args.onSelect(selectedValue);
  }

  get options() {
    if (this.args.variation === 'priority') {
      return ['low',
              'normal',
              'high',
              'urgent'
            ];
    }
    if (this.args.variation === 'status') {
      return [
        'new',
        'in-triage',
        'in-review',
        'in-progress',
        'on-hold',
        'done',
      ];
    }
    return [];
  }
}
