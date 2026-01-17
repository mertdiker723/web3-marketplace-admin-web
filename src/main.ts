import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

// Styles
import './assets/main.scss'

import App from './App.vue'
import router from './router'
import Input from './common/Input/index.vue'
import Button from './common/Button/index.vue'
import TextArea from './common/TextArea/index.vue'
import SelectBox from './common/SelectBox/index.vue'
import Modal from './common/Modal/index.vue'
import DataTable from './common/DataTable/index.vue'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.component('input-field', Input)
app.component('button-field', Button)
app.component('text-area', TextArea)
app.component('select-box-field', SelectBox)
app.component('modal-field', Modal)
app.component('data-table', DataTable)

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
