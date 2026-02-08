import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {StudioLogo} from './components/StudioLogo'

export default defineConfig({
  name: 'default',
  title: 'Ambalan Website',

  projectId: 'x4rrz2fy',
  dataset: 'production',
  
  basePath: '/studio', 

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
  
  studio: {
    components: {
      logo: StudioLogo
    }
  }
})
