import type { App } from "vue"
interface EagerLoadedModule{
    default:(app:App)=>void
}
type EagerLoadedModules=Record<string,EagerLoadedModule>
export const useAllPlugins = (app: App) => {
    // app.use(load)
    const modules:EagerLoadedModules = import.meta.glob('./*.ts', { eager: true })
    console.log('modules', modules);
    for (const fileName in modules) {
        console.log(fileName, 'fileName');
        if (typeof modules[fileName].default === 'function') {
            if (fileName != './index.ts') {
                modules[fileName].default(app)
            }

        }
    }
}