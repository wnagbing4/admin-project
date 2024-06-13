import type { App } from 'vue'

interface EagerLoadedModule {
  default: (app: App) => void
}

type EagerLoadedModules = Record<string, EagerLoadedModule>

export const useAllPlugins = (app: App) => {
  const modules: EagerLoadedModules = import.meta.glob('./*.ts', { eager: true })
  for (const fileName in modules) {
    if (typeof modules[fileName].default === 'function') {
      if (fileName != './index.ts') {
        modules[fileName].default(app)
      }
    }
  }
}
