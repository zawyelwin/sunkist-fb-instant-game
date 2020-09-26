<template>
  <div id="app">
    <header>
      <div class="container">
        <router-link to="/">
          <h1>{{ appName }}</h1>
        </router-link>
      </div>
    </header>

    <vue-page-transition name="fade">
      <router-view :key="$route.fullPath" />
    </vue-page-transition>
  </div>
</template>

<script>
export default {
  name: "quiz",

  data: function() {
    return {
      appName: process.env.VUE_APP_NAME
    };
  }
};
</script>