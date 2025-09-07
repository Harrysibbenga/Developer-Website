// src/utils/portfolioFilters.ts
/**
 * Portfolio Filters - Now uses the enhanced utility
 * Simplified interface for backward compatibility
 */

import { initializePortfolioFiltering, PortfolioFilterManager } from './portfolio-filter-utility'

let currentFilterManager: PortfolioFilterManager | null = null

export function initializePortfolioFilters(root: HTMLElement): void {
  console.log('🎨 Initializing portfolio filters (legacy interface)...')
  
  // Clean up existing manager
  if (currentFilterManager) {
    currentFilterManager.cleanup()
  }
  
  // Initialize new manager
  currentFilterManager = initializePortfolioFiltering(root)
  
  if (currentFilterManager) {
    console.log('✅ Portfolio filters initialized successfully')
  } else {
    console.error('❌ Failed to initialize portfolio filters')
  }
}

// Export for direct access to the manager
export function getPortfolioFilterManager(): PortfolioFilterManager | null {
  return currentFilterManager
}

// Cleanup function
export function cleanupPortfolioFilters(): void {
  if (currentFilterManager) {
    currentFilterManager.cleanup()
    currentFilterManager = null
  }
}