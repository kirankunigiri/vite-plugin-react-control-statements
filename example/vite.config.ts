import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import reactControlStatements from 'vite-plugin-react-control-statements'
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		reactControlStatements(),
		Inspect()
	],
})
