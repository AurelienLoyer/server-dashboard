<template>
    <v-flex xs12 sm3>
        <v-card>
            <v-card-title primary-title>
                <h3 class="headline mb-0">{{title}}</h3>
            </v-card-title>
            <canvas class="gauge" width="200px" height="200px" />
            <div class="infos">
                <i class="fas" :class="icon"></i><br>
                {{value}}%
            </div>
            <v-card-actions class="text-xs-right">
                <v-btn flat color="orange"  @click="$emit('refresh',true)">refresh</v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>


<script>
export default {
  props: {
    color: {
      default: "#91c2ff"
    },
    value: {
      default: 0
    },
    min: {
      default: 0
    },
    max: {
      default: 100
    },
    icon: {},
    title: {}
  },
  data() {
    return {
      ratio: (this.value - this.min) / (this.max - this.min)
    };
  },
  mounted() {
    this.drawGauge();
  },
  methods: {
      drawGauge() {
          const ctx = this.$el.querySelector(".gauge").getContext("2d");
    ctx.beginPath();
    ctx.arc(
      100,
      100,
      85,
      -1 / 2 * Math.PI,
      this.ratio * 2 * Math.PI - 1 / 2 * Math.PI
    );
    ctx.lineWidth = 30;
    ctx.strokeStyle = this.color;
    ctx.stroke();
      }
  }
};
</script>

<style scoped lang="scss">
.card {
  text-align: center;

  h3 {
    width: 100%;
    text-align: center;
  }

  .infos {
    font-size: 2em;
    text-align: center;
    top: 120px;
    position: absolute;
    width: 100%;
  }
}
</style>
