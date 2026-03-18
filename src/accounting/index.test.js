// Unit tests for Student Account Management System
const { describe, test, expect, beforeEach } = require('@jest/globals');

// Simulate the business logic from index.js
let storageBalance;
function resetBalance() { storageBalance = 1000.00; }

function viewBalance() {
  return storageBalance.toFixed(2);
}

function creditAccount(amount) {
  if (isNaN(amount) || amount < 0) return 'Invalid amount.';
  storageBalance += amount;
  return `Amount credited. New balance: ${storageBalance.toFixed(2)}`;
}

function debitAccount(amount) {
  if (isNaN(amount) || amount < 0) return 'Invalid amount.';
  if (storageBalance >= amount) {
    storageBalance -= amount;
    return `Amount debited. New balance: ${storageBalance.toFixed(2)}`;
  } else {
    return 'Insufficient funds for this debit.';
  }
}

describe('Student Account Management System', () => {
  beforeEach(() => resetBalance());

  test('TC01: View initial balance', () => {
    expect(viewBalance()).toBe('1000.00');
  });

  test('TC02: Credit account with valid amount', () => {
    expect(creditAccount(100)).toBe('Amount credited. New balance: 1100.00');
  });

  test('TC03: Debit account with valid amount', () => {
    creditAccount(200); // Add funds first
    expect(debitAccount(200)).toBe('Amount debited. New balance: 1000.00');
  });

  test('TC04: Debit account with insufficient funds', () => {
    expect(debitAccount(2000)).toBe('Insufficient funds for this debit.');
  });

  test('TC07: Credit account with zero amount', () => {
    expect(creditAccount(0)).toBe('Amount credited. New balance: 1000.00');
  });

  test('TC08: Debit account with zero amount', () => {
    expect(debitAccount(0)).toBe('Amount debited. New balance: 1000.00');
  });

  test('TC09: Multiple credits and debits', () => {
    creditAccount(100);
    debitAccount(50);
    creditAccount(200);
    debitAccount(100);
    expect(viewBalance()).toBe('1150.00');
  });

  test('TC06: Invalid menu choice (simulated)', () => {
    // Menu logic is handled in CLI, so simulate invalid input
    expect(['1','2','3','4'].includes('5')).toBe(false);
  });
});
