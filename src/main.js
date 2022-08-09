import Vue from "vue";
import App from "./App.vue";
import ElementUI, {
  Button,
  Radio,
  Container,
  Main,
  Header,
  Aside,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Input,
  Select,
  Switch,
  DatePicker,
  Dialog,
  Option,
  Pagination,
  MessageBox,
  Message,
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/less/index.less";

import router from "../router";
import store from "../store";
import http from "axios";
import "../api/mock.js";

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Radio);
Vue.use(Container);
Vue.use(Main);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Switch);
Vue.use(DatePicker);
Vue.use(Dialog);
Vue.use(Option);
Vue.use(Pagination);

Vue.prototype.$http = http;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

// 导航守卫
router.beforeEach((to, from, next) => {
  store.commit("getToken");
  const token = store.state.user.token;
  // 如果 token 不存在或者去向页不是登录页,阻止进入
  if (!token && to.name !== "login") {
    next({ name: "login" });
  }
  // 如果在首页/home跳转登录页/login则返回/home
  else if (token && to.name === "login") {
    next({ path: "/home" });
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    store.commit("addMenu", router);
  },
}).$mount("#app");
