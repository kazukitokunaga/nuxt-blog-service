<template>
  <el-menu mode="horizontal" :router="true">
    <el-menu-item index="1" style="pointer-events:none;">
      Nuxt Diary App
    </el-menu-item>
    <el-menu index="2" :route="{ path: '/posts' }">
      投稿一覧
    </el-menu>

    <no-ssr>
      <el-menu-item index="3" style="float: right;"
        :route="{ path: `users/${user.id}` }" v-if="user">
        <span>{{ user.id }}</span>
      </el-menu-item>
      <el-menu-item index="4" style="float: right;" @click="signOut()" v-if="user">
          <span>ログアウト</span>
      </el-menu-item>
      <el-menu-item index="5"
        :route="{ path: '/' }" style="float: right;" v-else>
        <span>ログイン</span>
      </el-menu-item>
    </no-ssr>
    <el-menu-item index="6" style="float: right" :route="{ path: '/posts/new' }">
      新規投稿
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Cookies from 'universal-cookie'

export default {
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    signOut() {
      this.$cookies.removeAll()
      location.href = '/'
    }
  },
}
</script>

