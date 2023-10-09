import { createRouter, createWebHistory } from 'vue-router'
import DatabasesView from "@/views/DatabasesView.vue";
import TablesView from "@/views/TablesView.vue";
import CreateDatabaseView from "@/views/createDatabaseView.vue";
import EntitiesView from "@/views/EntitiesView.vue";
import CreateTableView from "@/views/CreateTableView.vue";
import EditEntityView from "@/views/EditEntityView.vue";
import ProjectionView from "@/views/ProjectionView.vue";
import CreateEntity from "@/views/CreateEntity.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'databases',
      component: DatabasesView
    },
    {
      path: '/database/:database',
      name: 'tables',
      component: TablesView
    },
    {
      path: '/database/create',
      name: 'databasecreate',
      component: CreateDatabaseView
    },
    {
      path: '/database/:database/table/:table',
      name: 'tableEntities',
      component: EntitiesView
    },
    {
      path: '/database/:database/table/create',
      name: 'tableCreate',
      component: CreateTableView
    },
    {
      path: '/database/:database/table/:table/edit/:field/:value',
      name: 'editEntity',
      component: EditEntityView
    },
    {
      path: '/database/:database/table/:table/projection/:field/:operator/:value',
      name: 'projection',
      component: ProjectionView
    },
    {
      path: '/database/:database/table/:table/entity/create',
      name: 'createEntity',
      component: CreateEntity
    }
  ]
})

export default router
