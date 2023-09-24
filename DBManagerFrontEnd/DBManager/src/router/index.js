import { createRouter, createWebHistory } from 'vue-router'
import DatabasesView from "@/views/DatabasesView.vue";
import TablesView from "@/views/TablesView.vue";
import CreateDatabaseView from "@/views/createDatabaseView.vue";
import EntitiesView from "@/views/EntitiesView.vue";
import CreateTableView from "@/views/CreateTableView.vue";
import EditEntityView from "@/views/EditEntityView.vue";
import ProjectionView from "@/views/ProjectionView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'databases',
      component: DatabasesView
    },
    {
      path: '/:database',
      name: 'tables',
      component: TablesView
    },
    {
      path: '/create',
      name: 'databasecreate',
      component: CreateDatabaseView
    },
    {
      path: '/:database/:table',
      name: 'tableEntities',
      component: EntitiesView
    },
    {
      path: '/:database/create',
      name: 'tableCreate',
      component: CreateTableView
    },
    {
      path: '/:database/:table/:field/:value/edit',
      name: 'editEntity',
      component: EditEntityView
    },
    {
      path: '/:database/:table/:field/:operator/:value/projection',
      name: 'projection',
      component: ProjectionView
    }
  ]
})

export default router
