<template>
  <div id="chart" class="bg-white  p-2 shadow-sm">
    <apexchart width="500" type="line" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: ['Jan', 'Fev', 'Mars', 'Avr', 'Mai', 'Jui', 'Jul', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec']
        }
      },
      series: [{
        name: "taux d'engagement",
        data: [3,5,10,20,30, 40, 45, 50, 49, 60, 70, 91]
      }]
    }
  }
}
</script>

<style>

</style>