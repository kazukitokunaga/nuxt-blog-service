<template>
    <el-button @click="googleLogin">googleでログイン</el-button>
</template>

<script>
import firebase from '@/plugins/firebase'
// import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'home',
  methods: {
    googleLogin: function() {
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }
  }
}
</script>