<template>
  <section class="container">
    <div class="links">
      <Home v-if="!isLogin"></Home>
      <Mypage v-if="isLogin" :user="userData"></Mypage>
    </div>
</section>
</template>

<script>
import firebase from '@/plugins/firebase'
import Home from '~/components/Home.vue';
import Mypage from '~/components/Mypage.vue';

export default {
  components: {
    Home,
    Mypage
  },
  asyncData({ context ,redirect, store }) {
    return {
      isLogin:false,
      userData:null,
    }
  },
  fetch () {
    // `fetch` メソッドはページの描画前にストアを満たすために使用される
  },
  mounted: function() {
    firebase.auth().onAuthStateChanged(user => {
      console.log('user:', user)
      if (user) {
        this.isLogin = true
        this.userData = user
      } else {
        this.isLogin = false
        this.userData = null
      }
    })
  },
  computed: {
  },
  methods: {
  }
}
</script>