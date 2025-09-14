<script setup lang="ts">
    import { onMounted } from "vue"
    
    onMounted(async () => {
      try {
        console.log("🚀 Starting website system initialization...")
    
        // Dynamic import to ensure client-side load
        const { default: SystemManager } = await import("@/utils/core/SystemManager")
    
        // Make available globally
        window.SystemManagerClass = SystemManager
    
        // Get instance
        const systemManager = SystemManager.getInstance()
        await systemManager.initialize()
    
        // Update classes
        document.body.classList.remove("system-loading")
        document.body.classList.add("system-ready")
    
        window.systemManager = systemManager
    
        console.log("✅ Website system fully initialized")
    
        // Fire ready event
        document.dispatchEvent(new CustomEvent("system:ready", { detail: { systemManager } }))
      } catch (error) {
        console.error("❌ System initialization failed:", error)
    
        document.body.classList.remove("system-loading")
        document.body.classList.add("system-error")
    
        document.dispatchEvent(new CustomEvent("system:error", { detail: { error } }))
      }
    })
    
    // Helpers (still global)
    window.checkSystemStatus = function () {
      const hasSystemManager = !!window.systemManager
      const isSystemReady = document.body.classList.contains("system-ready")
      const hasError = document.body.classList.contains("system-error")
    
      return {
        hasSystemManager,
        isSystemReady,
        hasError,
        modules: hasSystemManager
          ? Array.from(window.systemManager.modules?.keys() || [])
          : []
      }
    }
    
    window.reinitializeSystem = async function () {
      if (window.systemManager) {
        try {
          console.log("🔄 Reinitializing system...")
          await window.systemManager.reinitialize()
          console.log("✅ System reinitialized")
          return true
        } catch (error) {
          console.error("❌ Reinitialize failed:", error)
          return false
        }
      }
      return false
    }
    </script>
    
<template>
    <!-- Nothing to render, it's a headless initializer -->
    <div style="display: none;"></div>
</template>
    