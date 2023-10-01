<template>
  <div class="mt-5">
    <p class="font-bold">{{ props.name }}</p>
    <div class="mt-5 h-[300px] rounded-lg border bg-background md:p-3">
      <Line :data="chartData" :options="chartOptions" ref="myChart" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Line } from "vue-chartjs";
import colors from "#tailwind-config/theme/colors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

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

const chartOptions = ref<ChartOptions<"line">>({
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
  scales: {
    y: {
      grid: {
        color: mode.value === "dark" ? colors.slate[900] : colors.slate[200],
      },
      ticks: {
        color: colors.slate[500],
      },
    },
    x: {
      grid: {
        color: mode.value === "dark" ? colors.slate[800] : colors.slate[200],
      },
      ticks: {
        color: colors.slate[500],
      },
    },
  },
});

const chartData = ref<ChartData<"line">>({
  labels: props.data.stats.labels,
  datasets: [
    {
      label: props.name,
      backgroundColor: colors.background,
      tension: 0.4,
      borderColor: colors.blue[500],
      borderWidth: 2,
      pointBackgroundColor: colors.blue[500],
      data: props.data.stats.data,
    },
  ],
});
</script>
