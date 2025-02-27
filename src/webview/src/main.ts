import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// import { provideVSCodeDesignSystem, vsCodeButton } from '@vscode/webview-ui-toolkit';

// provideVSCodeDesignSystem().register(vsCodeButton());

// const app = createApp(App)
// app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('vscode-');
// app.mount('#app')
createApp(App).mount('#app')
