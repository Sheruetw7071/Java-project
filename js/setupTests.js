// Setup file for Jest tests
// This file can be used to configure test environment globally

// Mock document for Node.js environment if needed
if (typeof window === 'undefined') {
  // Node.js environment
  global.document = {
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    addEventListener: () => {},
  };
}
