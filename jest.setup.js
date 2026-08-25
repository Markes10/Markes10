require('@testing-library/jest-dom');

// Mock browser APIs for jsdom (only in jsdom environment)
if (typeof document !== 'undefined') {
  if (typeof URL.createObjectURL === 'undefined') {
    URL.createObjectURL = jest.fn(() => 'blob:mock');
    URL.revokeObjectURL = jest.fn();
  }
  if (!document.body) {
    document.body = document.createElement('body');
  }
}
