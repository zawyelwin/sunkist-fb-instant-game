<template>
  <div>
    <loading :loading="loadingOverlay" containerClass="loading-overlay" />

    <section id="quiz">
      <div class="container">
        <h3 class="quiz-title">{{ quiz.title }}</h3>

        <button class="btn btn-fb-share" v-on:click="share">
          <font-awesome-icon
            :icon="['fab', 'facebook-square']"
          ></font-awesome-icon>
          <span>Share</span>
        </button>

        <div class="quiz-result" v-bind:class="{ show: !loading }">
          <canvas id="canvas" width="600" height="600"></canvas>

          <vue-page-transition name="fade">
            <div class="quiz-result-loading" v-if="loading">Generating...</div>
          </vue-page-transition>
        </div>

        <div class="quiz-action">
          <button class="btn btn-fb-share" v-on:click="share">
            <font-awesome-icon
              :icon="['fab', 'facebook-square']"
            ></font-awesome-icon>
            <span>Share</span>
          </button>
          <span class="btn btn-try-again" v-on:click="generateResult"
            >Try Again</span
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TypeIt from "typeit";

export default {
  name: "Quiz",

  props: {
    quiz: {
      type: Object,
      required: true
    },
    player: {
      type: Object,
      required: true
    },
    gender: {
      type: String,
      required: true
    }
  },

  data: function() {
    return {
      loading: true,
      loadingOverlay: false,
      resultImage: "",
      loadedImages: {},
      resultFinal: "",
      adCounter: 0,
      preloadedAd: null
    };
  },

  methods: {
    // Preload image, then generate result image
    generateResult() {
      let self = this;

      self.getResultImage();

      self.loading = true;

      // Preload images
      let images = [self.resultImage, self.player.pic];

      let promisesArray = images.map(function(src) {
        let promise = new Promise(function(resolve, reject) {
          let img = new Image();

          img.onload = function() {
            self.loadedImages[src] = img;
            resolve();
          };

          img.crossOrigin = "anonymous";
          img.src = src;
        });

        return promise;
      });

      self.preloadAd();

      Promise.all(promisesArray).then(function() {
        setTimeout(function() {
          self.generateResultImage();
        }, 500);
      });
    },

    // Get random result image from json file
    getResultImage() {
      let gender = this.gender;
      let slug = this.$route.params.slug;
      // maxImage = this.quiz.result.images,
      // randomImage = Math.floor(Math.random() * maxImage) + 1
      let randomImage = 0;
      if (gender === "Male") {
        randomImage = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
      } else {
        randomImage = Math.floor(Math.random() * (4 - 3 + 1)) + 3;
      }

      this.resultImage = "quizzes/" + slug + "/" + randomImage + ".png";
    },

    // Generate final result image
    generateResultImage() {
      let canvas = document.getElementById("canvas");

      if (canvas.getContext) {
        let ctx = canvas.getContext("2d"),
          quizResult = this.quiz.result,
          background = this.loadedImages[this.resultImage],
          playerPic = this.loadedImages[this.player.pic],
          playerOption = quizResult.player;

        ctx.drawImage(background, 0, 0);
        let x = canvas.width / 2;
        let y = playerOption.name.position.y;
        if (playerOption.name.show) {
          ctx.font = playerOption.name.font;
          ctx.textAlign = playerOption.name.align;
          ctx.fillStyle = playerOption.name.color;
          ctx.fillText(this.player.name, x, y);
        }

        if (playerOption.pic.show) {
          ctx.drawImage(
            playerPic,
            playerOption.pic.position.x,
            playerOption.pic.position.y,
            playerOption.pic.width,
            playerOption.pic.height
          );
        }
      }

      this.resultFinal = canvas.toDataURL("image/jpeg", 0.9);

      this.loading = false;

      this.showAd();
    },

    preloadAd: function() {
      if (!process.env.VUE_APP_FAN_AD_ID) {
        return;
      }

      let self = this;

      // Preload ad based on frequency
      if (this.adCounter % process.env.VUE_APP_FAN_AD_FREQUENCY == 0) {
        FBInstant.getInterstitialAdAsync(process.env.VUE_APP_FAN_AD_ID).then(
          function(ad) {
            self.preloadedAd = ad;
            return self.preloadedAd.loadAsync();
          }
        );
      }
    },

    showAd: function() {
      if (!process.env.VUE_APP_FAN_AD_ID) {
        return;
      }

      // Show ad based on frequency
      if (
        this.preloadedAd &&
        this.adCounter % process.env.VUE_APP_FAN_AD_FREQUENCY == 0
      ) {
        this.preloadedAd.showAsync();
      }

      this.adCounter++;
    },

    share: function(event) {
      let self = this;
      self.loadingOverlay = true;

      FBInstant.shareAsync({
        intent: "SHARE",
        image: this.resultFinal,
        text: "text"
      })
        .then(function() {
          self.loadingOverlay = false;
        })
        .catch(function() {
          setTimeout(function() {
            self.loadingOverlay = false;
          }, 500);
        });
    }
  },

  mounted: function() {
    this.generateResult();
  }
};
</script>
