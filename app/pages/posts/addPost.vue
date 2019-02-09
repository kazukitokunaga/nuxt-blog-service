<template>
  <section class="container posts-page">
    <el-card style="flex: 1">
      <div slot="header" class="clearfix">
        <el-input placeholder="タイトルを入力" v-model="formData.title" />
      </div>
      <div>
        <el-input placeholder="本文を入力......" type="textarea" rows="15" v-model="formData.body" />
      </div>
      <div class="preview">
        <vue-markdown :source="source"></vue-markdown>
      </div>
      <div class="text-right" style="margin-top: 16px;">
        <el-button type="primary" @click="publish" round>
          <span class="el-icon-upload2" />
          <span>Publish</span>
        </el-button>
      </div>
    </el-card>
  </section>
</template>

<script>
import firebase from '@/plugins/firebase'
import { mapGetters, mapActions } from 'vuex'
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    VueMarkdown
  },
  asyncData({ context, redirect, store }) {
    return {
      isLogin:false,
      userData:null,
      formData: {
        title: '',
        body: ''
      }
    }
  },
  fetch () {
    // `fetch` メソッドはページの描画前にストアを満たすために使用される
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        try {
          this.isLogin = true
          this.userData = user
          this.$notify({
            title: 'ログイン成功',
            message: `${this.userData.displayName}としてログインしました`,
            position: 'bottom-right',
            duration: 1000
          })
        } catch(e) {
          this.$notify.error({
            title: 'ログイン失敗',
            message: '不正なユーザーIDです',
            position: 'bottom-right',
            duration: 1000
          })
        }
      } else {
        this.isLogin = false
        this.userData = null
        this.$router.push('/login/')
      }
    })
  },
  computed: {
      source(){
        return this.formData.body
      }
  },
  methods: {
    async publish(){
      const userName = {
        id: this.userData.displayName
      }
      const payload = {
        user: userName,
        ...this.formData,
      }
      await this.register({ ...userName })
      .then(await this.publishPost({ payload }))
      this.$router.push('/')
    },
    ...mapActions(['register']),
    ...mapActions('posts', ['publishPost'])
  }
}
</script>

<style>
@import "~/assets/index.css";
@import "~/assets/posts.css";
</style>