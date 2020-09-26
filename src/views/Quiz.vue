<template>
  <div class="quiz-wrapper">
    <div v-if="!loading">
      <Quiz :quiz="quiz" :player="player" :gender="gender" />

      <!-- <hr />
            <h2 style="text-align: center;">You may like:</h2>
            <Quizzes :excludes="this.$route.params.slug" /> -->
    </div>

    <loading :loading="loading" />
  </div>
</template>

<script>
import Quiz from "@/components/Quiz.vue";
import Quizzes from "@/components/Quizzes.vue";

export default {
  name: "quiz",

  components: {
    Quiz
  },

  data: function() {
    return {
      quiz: {},
      player: {},
      loading: true,
      gender: ""
    };
  },

  methods: {
    checkQuiz() {
      const quizzes = "quizzes.json";

      this.$http.get(quizzes).then(result => {
        const data = result.data;
        const slug = this.$route.params.slug;
        const checkQuiz = data.hasOwnProperty(slug);

        this.quiz.title = data[slug];
        this.gender = this.$route.params.gender;

        // Check if quiz exist in quizzes.json
        if (checkQuiz == true) {
          this.getQuiz(slug);
        } else {
          this.quizNotFound();
        }
      });
    },

    getQuiz(slug) {
      // Check if quiz config json file exist
      const quiz = "quizzes/" + slug + "/config.json";

      this.$http
        .get(quiz)
        .then(item => {
          FBInstant.initializeAsync()
            .then(this.onLoad())
            .then(this.setPlayer());

          this.quiz.result = item.data;

          this.loading = false;
        })
        .catch(error => {
          this.quizNotFound();
        });
    },

    quizNotFound() {
      this.$router.push("/quizzes");
    },

    onLoad() {
      FBInstant.setLoadingProgress(50);
      FBInstant.setLoadingProgress(100);

      FBInstant.startGameAsync().then();
    },

    setPlayer() {
      this.player.name = FBInstant.player.getName();
      this.player.pic = FBInstant.player.getPhoto();
    }
  },

  created: function() {
    this.checkQuiz();
  }
};
</script>
