<template>
  <div class="container">
    <div v-bind:class="{ show: !loading }">
      <ul class="quizzes-list" v-if="!loading">
        <li class="quiz-item" v-bind:key="quiz" v-for="(quiz, slug) in quizzes">
          <router-link :to="'/gender/' + slug">
            <img :src="'quizzes/' + slug + '/thumbnail.png'" />
            <h5>{{ quiz }}</h5>
          </router-link>
        </li>
      </ul>
      <loading :loading="loading" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Quizzes",

  props: {
    excludes: [String, Array]
  },

  data: function() {
    return {
      quizzes: {},
      loading: true
    };
  },

  methods: {
    loadQuizzes: function() {
      const quizzes = "quizzes.json";

      this.$http.get(quizzes).then(item => {
        var quizItems = item.data;

        if (Array.isArray(this.excludes)) {
          for (var i = 0; i < this.excludes.length; i++) {
            delete quizItems[this.excludes[i]];
          }
        } else {
          delete quizItems[this.excludes];
        }

        this.quizzes = item.data;
        this.loading = false;
      });
    }
  },

  created: function() {
    this.loadQuizzes();
  }
};
</script>
