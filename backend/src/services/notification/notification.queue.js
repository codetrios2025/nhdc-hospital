class NotificationQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  /*
  |--------------------------------------------------------------------------
  | Add Job
  |--------------------------------------------------------------------------
  */

  async add(job) {
    this.queue.push(job);

    if (!this.processing) {
      this.process();
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Process Queue
  |--------------------------------------------------------------------------
  */

  async process() {
    this.processing = true;

    while (this.queue.length) {
      const job = this.queue.shift();

      try {
        await job.handler(job.payload);
      } catch (error) {
        console.error(error);
      }
    }

    this.processing = false;
  }
}

module.exports = new NotificationQueue();
