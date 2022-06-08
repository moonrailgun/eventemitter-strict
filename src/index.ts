interface EventEmitterOptions {
  once?: boolean;
}

type EventEmitterListenerItem = EventEmitterOptions & {
  callback: (...args: unknown[]) => void;
};

type EventEmitterBaseEventMap = Record<string, any>;

/**
 * A EventEmitter work like node/event
 */
export class EventEmitter<E extends EventEmitterBaseEventMap> {
  static onceSymbol = Symbol('once');
  private listeners = {} as Record<keyof E, EventEmitterListenerItem[]>;

  /**
   * Send Event to all listener
   * @param eventName Event Name
   * @param args arguments
   */
  emit<K extends keyof E>(eventName: K, ...args: Parameters<E[K]>) {
    if (this.listeners[eventName]) {
      try {
        this.listeners[eventName].forEach((item) => {
          if (typeof item.callback === 'function') {
            item.callback(...args);
          }

          if (item.once === true) {
            this.off(eventName, item.callback as E[K]);
          }
        });
      } catch (e) {}
    }

    return this;
  }

  /**
   * Add event listener
   * @param eventName Event Name
   * @param callback Event Callback
   */
  on<K extends keyof E>(
    eventName: K,
    callback: E[K],
    options?: EventEmitterOptions
  ) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push({ ...options, callback });

    return this;
  }

  /**
   * Remove event listener
   * @param eventName Event Name
   * @param callback Event Callback
   */
  off<K extends keyof E>(eventName: K, callback: E[K]) {
    if (!this.listeners[eventName]) {
      return;
    }

    const index = this.listeners[eventName].findIndex(
      (item) => item.callback === callback
    );
    if (index >= 0) {
      this.listeners[eventName].splice(index, 1);
    }

    if (this.listeners[eventName].length === 0) {
      delete this.listeners[eventName];
    }

    return this;
  }

  /**
   * Like on but just run once
   * @param eventName Event Name
   * @param callback Event Callback
   */
  once<K extends keyof E>(eventName: K, callback: E[K]) {
    this.on(eventName, callback, { once: true });

    return this;
  }
}
