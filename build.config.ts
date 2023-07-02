import { defineBuildConfig } from 'unbuild'
export default defineBuildConfig({
  entries: [
    'source/index'
  ],
  declaration: true,
  clean: true,
})
