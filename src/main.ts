import { createApp } from 'vue'
import "amfe-flexible";
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import {
  Col, Row, Button, Field, CellGroup,
  Steps, Step, RadioGroup, Radio, List,
  Cell, Notify, Space
} from 'vant';
import 'vant/lib/index.css'
import router from './router'
import { updateVantCSSVar } from './util/css';
import Vconsole from "vconsole";
const components: { [k: string]: any } = {
  Col, Row, Button, Field, CellGroup, Step,
  Steps, RadioGroup, Radio, List, Cell, Space
}

const pinia = createPinia()
const app = createApp(App);
Object.keys(components).forEach(key => app.component(key, components[key]))
updateVantCSSVar()

if (import.meta.env.MODE !== 'prod') {
  app.use(()=>(new Vconsole()))
}
app.use(pinia).use(router).mount("#app")
