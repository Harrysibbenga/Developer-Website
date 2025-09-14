// src/utils/core/SystemManager.ts
/**
 * Core System Manager - Single point of initialization
 */
import { NavigationManager } from './modules/NavigationManager'
import { ScrollManager } from './modules/ScrollManager'
import { AnimationManager } from './modules/AnimationManager'
import { PageTransitionManager } from './modules/PageTransitionManager'
import { PerformanceManager } from './modules/PerformanceManager'
import { FormManager } from './modules/FormManager'

interface SystemConfig {
  gaId?: string
  enableAnalytics?: boolean
  debugMode?: boolean
}

export class SystemManager {
  private static instance: SystemManager
  private initialized = false
  private modules: Map<string, any> = new Map()
  private config: SystemConfig

  private constructor(config: SystemConfig = {}) {
    this.config = config
    
    // Prevent multiple instances
    if (window.systemManager) {
      return window.systemManager
    }
    window.systemManager = this
  }

  static getInstance(config?: SystemConfig): SystemManager {
    if (!SystemManager.instance) {
      SystemManager.instance = new SystemManager(config)
    }
    return SystemManager.instance
  }

  async initialize(): Promise<void> {
    if (this.initialized) return

    console.log('🚀 System Manager: Starting...')
    
    // Wait for DOM
    await this.waitForDOM()
    
    // Clean up any existing state
    this.cleanup()
    
    // Initialize modules in dependency order
    await this.initializeModules()
    
    this.initialized = true
    document.body.classList.add('system-ready')
    console.log('✅ System Manager: Complete')
  }

  private async initializeModules(): Promise<void> {
    const moduleConfigs = [
        { name: 'performance', class: PerformanceManager, deps: [] },
        { name: 'navigation', class: NavigationManager, deps: [] },
        { name: 'scroll', class: ScrollManager, deps: [] },
        { name: 'animations', class: AnimationManager, deps: [] },
        { name: 'transitions', class: PageTransitionManager, deps: [] },
        { name: 'forms', class: FormManager, deps: [] },
    ]

    for (const config of moduleConfigs) {
      try {
        const instance = new config.class(this.config)
        await instance.initialize()
        this.modules.set(config.name, instance)
        console.log(`✓ ${config.name} module ready`)
      } catch (error) {
        console.error(`✗ ${config.name} module failed:`, error)
      }
    }
  }

  private waitForDOM(): Promise<void> {
    return new Promise(resolve => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve)
      } else {
        setTimeout(resolve, 10)
      }
    })
  }

  private cleanup(): void {
    // Cleanup existing modules
    this.modules.forEach(module => {
      if (module.cleanup) {
        module.cleanup()
      }
    })
    this.modules.clear()
    
    this.initialized = false
  }

  public async reinitialize(): Promise<void> {
    this.cleanup()
    await this.initialize()
  }

  public getModule<T>(name: string): T | null {
    return this.modules.get(name) || null
  }

  public isInitialized(): boolean {
    return this.initialized
  }
}

// Global type augmentation
declare global {
  interface Window {
    systemManager: SystemManager
  }
}

export default SystemManager