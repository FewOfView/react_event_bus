import { EventBusCb, EventBus } from '../../libs';
export enum ModalEventNames {
  CONFIRM = 'CONFIRM',
  REJECT = 'REJECT',
  OPEN = 'OPEN',
}
class ModalEvents extends EventBus {
  constructor(private readonly modalName: string) {
    super();
    this.modalName = modalName;
  }

  private getEventName(event: ModalEventNames) {
    return `${this.modalName}_${event}`;
  }

  public getModalResult() {
    this.publish(this.getEventName(ModalEventNames.OPEN));
    return new Promise((res, rej) => {
      this.subscribe(this.getEventName(ModalEventNames.CONFIRM), res);
      this.subscribe(this.getEventName(ModalEventNames.REJECT), rej);
    });
  }

  public confirmModal(payload: unknown) {
    this.publish(this.getEventName(ModalEventNames.CONFIRM), payload);
    this.clearActions();
  }

  public rejectModal(payload: unknown) {
    this.publish(this.getEventName(ModalEventNames.REJECT), payload);
    this.clearActions();
  }

  public onOpen(cb: EventBusCb) {
    return this.subscribe(this.getEventName(ModalEventNames.OPEN), cb);
  }

  private clearActions() {
    this.clearByName(this.getEventName(ModalEventNames.CONFIRM));
    this.clearByName(this.getEventName(ModalEventNames.REJECT));
  }
}

export default ModalEvents;
