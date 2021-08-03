export class FirebaseStub {
  analytics() {
    return { logEvent: this.logEvent };
  }

  logEvent(_event: string): void {
    return null;
  }
}
