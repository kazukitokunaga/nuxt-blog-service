<template>
<div id="mypage">
  <span>こんにちは, {{ user.displayName }}さん</span>
  <button @click="logout">ログアウト</button>
  <section>
    <nuxt-link to="/">
      &lt; 投稿一覧へ戻る
    </nuxt-link>
  </section>
  <section>
    <nuxt-link to="/posts/new">
      記事投稿画面へ
    </nuxt-link>
  </section>
</div>
</template>

<script>
import firebase from '@/plugins/firebase'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'mypage',
  props: ['user'],
  methods: {
    logout: function() {
      firebase.auth().signOut();
    }
  }
}
</script>