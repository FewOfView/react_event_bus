export type EventBusCb = (payload?: unknown) => void;

export type EventBusEvent = Record<number | string, EventBusCb>;

class EventBus {
  private readonly events: Record<string, EventBusEvent>;
  private cbId: number;

  constructor() {
    this.events = {};
    this.cbId = 0;
  }

  public subscribe(name: string, cb: EventBusCb) {
    const id = this.cbId++;

    if (!this.events[name]) {
      this.events[name] = { [id]: cb };
    } else {
      this.events[name][id] = cb;
    }

    return () => this.unSubscribe(name, id);
  }

  private unSubscribe(name: string, id: number | string) {
    delete this.events[name][id];

    if (Object.keys(this.events[name]).length === 0) {
      delete this.events[name];
    }
  }

  public publish(name: string, payload?: unknown) {
    const callbacks = this.events[name];

    if (!callbacks) {
      console.warn(`event ${name} not found`);
      return;
    }

    for (const id in callbacks) {
      callbacks[id](payload);
    }
  }

  public clearByName(name: string) {
    delete this.events[name];
  }
}

export default EventBus;
