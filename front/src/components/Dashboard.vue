<template lang="html">
  <v-layout align-center justify-space-around>
    <v-gauge v-if="cpuPerc !== false" :value="cpuPerc" title="CPU" color="#38CA73" icon="fa-heartbeat" @refresh="getCpu()"></v-gauge>
    <v-gauge v-if="diskPerc" :value="diskPerc" title="DISK" color="#F0C330" icon="fa-hdd" @refresh="getDisk()"></v-gauge>
    <v-gauge v-if="ramPerc" :value="ramPerc" title="MEMORY" color="#E44E41" icon="fa-microchip" @refresh="getMemory()"></v-gauge>
  </v-layout>
  </div>
</template>

<script>
  import Gauge from './Gauge.vue'
  import env from 'env'

  export default {
    name: 'home',
    data() {
      return {
        ramPerc: false,
        diskPerc: false,
        cpuPerc: false,
      }
    },
    components: {
      'v-gauge': Gauge,
    },
    mounted() {
      this.getMemory();
      this.getDisk();
      this.getCpu();
    },
    methods: {
      getCpu() {
        this.$http.get(`${env.api}/cpu`)
          .then(resp => resp.json())
          .then(data => {
            console.log(data);
            this.cpuPerc = Math.round(data*100);
          })
      },
      getMemory() {
        this.$http.get(`${env.api}/memory`)
          .then(resp => resp.json())
          .then(data => {
            console.log(data.usedPercent);
            this.ramPerc = Math.round(data.usedPercent);
          })
      },
      getDisk() {
        this.$http.get(`${env.api}/disks`)
          .then(resp => resp.json())
          .then(disks => {
            console.log(disks)
            disks.map(disk => {
              if (disk.filesystem === '/dev/simfs')  this.diskPerc = 100 * disk.capacity
            })
          })
      }
    }
  }
</script>

<style lang="css">
</style>
