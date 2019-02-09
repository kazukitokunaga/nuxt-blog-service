<template>
  <section class="container posts-page">
    <div style="flex: 1">
      <el-card v-if="post">
        <div slot="header" class="clearfix">
          <h2>{{ post.title }}</h2>
          <small>by {{ post.user.id }}</small>
        </div>
        <vue-markdown :source="source"></vue-markdown>
        <no-ssr>
          <nuxt-link to="/">
            &lt; 投稿一覧へ戻る
          </nuxt-link>
        </no-ssr>
        <p class="text-right">
          {{ post.created_at | time }}
        </p>
      </el-card>
      <p>
        <nuxt-link to="/posts">
          &lt; 投稿一覧へ戻る
        </nuxt-link>
      </p>
    </div>
  </section>
</template>

<script>
import moment from '~/plugins/moment'
import { mapGetters, mapActions } from 'vuex'
import cloneDeep from 'lodash.clonedeep'
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    VueMarkdown
  },
  async asyncData({ store, route }){
    if (store.getters['posts/posts'].find(p => p.id === route.params.id)) {
      return
    }
    await store.dispatch('posts/fetchPosts')
  },
  computed: {
    source() {
      return this.post.body
    },
    post() {
      return this.posts.find(p => p.id === this.$route.params.id)
    },
    ...mapGetters(['user', 'isLoggedIn']),
    ...mapGetters('posts', ['posts'])
  },
  methods: {
  },
  filters: {
    time(val) {
      return moment(val).format('YYYY/MM/DD HH:mm:ss')
    }
  }
}
</script>

<style>
@import "~/assets/index.css";
@import "~/assets/posts.css";
</style>