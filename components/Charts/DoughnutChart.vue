<template>
  <div class="mt-5">
    <p class="font-bold">{{ props.name }}</p>
    <div class="mt-5 h-[300px] rounded-lg border bg-background md:p-3">
      <Doughnut :data="chartData" :options="chartOptions" ref="myChart" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
import colors from "#tailwind-config/theme/colors";

ChartJS.register(ArcElement, Tooltip, Legend);

const mode = useColorMode();

// Define a prop named "data" to receive data from the parent component
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      intersect: false,
    },
  },
};

const chartData = {
  labels: props.data.stats.labels,
  datasets: [
    {
      backgroundColor: [
        colors.blue[100],
        colors.blue[200],
        colors.blue[300],
        colors.blue[400],
        colors.blue[500],
        colors.blue[600],
        colors.blue[700],
        colors.blue[800],
        colors.blue[900],
      ],
      data: props.data.stats.data,
    },
  ],
};
</script>
