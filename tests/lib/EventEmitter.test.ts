import { EventEmitter as CoreEventEmitter } from 'openai/core/EventEmitter';
import { EventEmitter as LibEventEmitter } from 'openai/lib/EventEmitter';

type TestEvents = {
  message: (value: string) => void;
  error: (error: Error) => void;
};

function runEmitterBehaviorTests(label: string, EventEmitterClass: new () => any) {
  class TestEmitter extends EventEmitterClass {
    emit<Event extends keyof TestEvents>(event: Event, ...args: Parameters<TestEvents[Event]>) {
      this['_emit'](event, ...args);
    }
  }

  describe(label, () => {
    test('emitted resolves when requested event is emitted', async () => {
      const emitter = new TestEmitter();
      const emitted = emitter['emitted']('message');

      emitter.emit('message', 'hello');

      await expect(emitted).resolves.toBe('hello');
    });

    test('emitted rejects when error is emitted before requested event', async () => {
      const emitter = new TestEmitter();
      const emitted = emitter['emitted']('message');
      const error = new Error('boom');

      emitter.emit('error', error);

      await expect(emitted).rejects.toThrow('boom');
    });

    test('emitted for error resolves with the error', async () => {
      const emitter = new TestEmitter();
      const emitted = emitter['emitted']('error');
      const error = new Error('expected');

      emitter.emit('error', error);

      await expect(emitted).resolves.toBe(error);
    });

    test('rejected emitted promise does not consume future events', async () => {
      const emitter = new TestEmitter();
      const first = emitter['emitted']('message');
      emitter.emit('error', new Error('first error'));
      await expect(first).rejects.toThrow('first error');

      const second = emitter['emitted']('message');
      emitter.emit('message', 'second message');

      await expect(second).resolves.toBe('second message');
    });
  });
}

runEmitterBehaviorTests('core EventEmitter', CoreEventEmitter as any);
runEmitterBehaviorTests('lib EventEmitter', LibEventEmitter as any);
