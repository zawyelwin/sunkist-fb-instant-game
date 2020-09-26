<template>
  <div class="container">
    <div v-bind:class="{ show: !loading }">
      <ul class="gender-list" v-if="!loading">
        <li class="gender-item" v-bind:key="gender" v-for="gender in genders">
          <!-- <router-link :to="'/quizzes/' + slug"> -->
          <router-link
            :to="{ name: 'quiz', params: { slug: slug, gender: gender } }"
          >
            <img :src="'quizzes/' + slug + '/' + gender + '.png'" />
            <h5>{{ gender }}</h5>
          </router-link>
        </li>
      </ul>

      <loading :loading="loading" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Gender",

  props: {
    excludes: [String, Array]
  },

  data: function() {
    return {
      gender: "",
      genders: ["Male", "Female"],
      loading: false,
      slug: this.$route.params.gender
    };
  }

  //   methods: {
  //     loadQuizzes: function() {
  //       const quizzes = "quizzes.json";

  //       this.$http.get(quizzes).then(item => {
  //         var quizItems = item.data;

  //         if (Array.isArray(this.excludes)) {
  //           for (var i = 0; i < this.excludes.length; i++) {
  //             delete quizItems[this.excludes[i]];
  //           }
  //         } else {
  //           delete quizItems[this.excludes];
  //         }

  //         this.quizzes = item.data;
  //         this.loading = false;
  //       });
  //     }
  //   }

  //   created: function() {
  //     this.loadQuizzes();
  //   }
};
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 400px;
  padding: 0 15px;
  margin: auto;
  position: relative;
}

img {
  max-width: 100%;
  margin-left: 80px;
  margin-top: 20px;
}

.gender-list,
.gender-list .gender-item {
  list-style: none;
  padding: 0;
  margin: 0;
}

.gender-list .gender-item a {
  background-color: #fff;
  color: #454545;
  text-decoration: none;
  border: 1px solid #d5d5d5;
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.075);

  margin-bottom: 20px;
  display: block;
}

.gender-list .gender-item img {
  display: block;
}

.gender-list .gender-item h5 {
  font-size: 20px;
  color: #444;
  margin: 20px 30px;
  text-align: center;
}
</style>