<template>
  <div>
    <h1 class="text-2xl font-semibold text-gray-900 dark:text-white mb-5">
      Analytics - Model Version 2.0
    </h1>

    <section class="mb-5 grid gap-5 md:grid-cols-3">
      <!-- Attrition Filter -->
      <div class="flex flex-col">
        <label
          for="attrition"
          class="mb-1 text-xs font-medium text-gray-900 dark:text-white"
        >
          Attrition
        </label>
        <select
          @change="filter"
          v-model="attrition"
          id="attrition"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        >
          <option value="" selected>All</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <!-- Department Filter -->
      <div class="flex flex-col">
        <label
          for="department"
          class="mb-1 text-xs font-medium text-gray-900 dark:text-white"
        >
          Department
        </label>
        <select
          @change="filter"
          v-model="department"
          id="department"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        >
          <option value="" selected>All</option>
          <option value="DealAdvisory">Deal Advisory</option>
          <option value="ITS">ITS</option>
          <option value="Marketing">Marketing</option>
          <option value="HR">HR</option>
          <option value="TECH">TECH</option>
          <option value="ITA">ITA</option>
          <option value="Legal">Legal</option>
          <option value="Consulting">Consulting</option>
          <option value="Sales">Sales</option>
          <option value="TAX">TAX</option>
          <option value="AAS">AAS</option>
          <option value="Audit">Audit</option>
          <option value="Payrol">Payrol</option>
        </select>
      </div>
      <!-- Job Role Filter -->
      <div class="flex flex-col">
        <label
          for="jobRole"
          class="mb-1 text-xs font-medium text-gray-900 dark:text-white"
        >
          Job Role
        </label>
        <select
          @change="filter"
          v-model="jobRole"
          id="jobRole"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        >
          <option value="" selected>All</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
          <option value="Manager">Manager</option>
          <option value="Director">Director</option>
          <option value="Partner">Partner</option>
        </select>
      </div>
    </section>

    <section class="mb-5 grid gap-5 md:grid-cols-3">
      <Charts-LineChart
        :data="EnvironmentSatisfaction"
        v-if="renderComponent"
        name="Env Satisfaction Distribution"
      />
      <Charts-LineChart
        :data="JobInvolvement"
        v-if="renderComponent"
        name="Job Involvement Distribution"
      />
      <Charts-LineChart
        :data="JobSatisfaction"
        v-if="renderComponent"
        name="Job Satisfaction Distribution"
      />
    </section>
    <section class="mb-5 grid gap-5 md:grid-cols-3">
      <Charts-DoughnutChart
        :data="PerformanceRating"
        v-if="renderComponent"
        name="Performance Rating Distribution"
      />
      <Charts-DoughnutChart
        :data="RelationshipSatisfaction"
        v-if="renderComponent"
        name="Relationship Distribution"
      />
      <Charts-DoughnutChart
        :data="WorkLifeBalance"
        v-if="renderComponent"
        name="WorkLife Balance Distribution"
      />
    </section>
    <Charts-LineChart
      :data="YearsSinceLastPromotion"
      v-if="renderComponent"
      name="Years Since Last Promotion Distribution"
    />
  </div>
</template>

<script setup lang="ts">
const attrition = ref("");
const department = ref("");
const jobRole = ref("");

const { data: EnvironmentSatisfaction } = await useFetch(
  "/proxy/stats/v2/EnvironmentSatisfaction/4",
  {
    method: "get",
  },
);

const { data: JobInvolvement } = await useFetch(
  "/proxy/stats/v2/JobInvolvement/4",
  {
    method: "get",
  },
);

const { data: JobSatisfaction } = await useFetch(
  "/proxy/stats/v2/JobSatisfaction/4",
  {
    method: "get",
  }
);

const { data: PerformanceRating } = await useFetch(
  "/proxy/stats/v2/PerformanceRating/4",
  {
    method: "get",
  },
);
const { data: RelationshipSatisfaction } = await useFetch(
  "/proxy/stats/v2/RelationshipSatisfaction/4",
  {
    method: "get",
  },
);
const { data: WorkLifeBalance } = await useFetch(
  "/proxy/stats/v2/WorkLifeBalance/4",
  {
    method: "get",
  },
);

const { data: YearsSinceLastPromotion } = await useFetch(
  "/proxy/stats/v2/YearsSinceLastPromotion/4",
  {
    method: "get",
  },
);

const filter = async () => {
  ////////////////////////////////////
  // reFetch EnvironmentSatisfaction Stats
  await useFetch(
    "/proxy/stats/v2/EnvironmentSatisfaction/4",
    {
    method: "get",
    params: {
      Attrition: attrition.value,
      Department: department.value,
      JobRole: jobRole.value,
    },
  }).then(
    (res) => {
      const data = res.data.value;
      const error = res.error.value;
      if (error) {
        console.log("ERROR:");
        console.log(error);
      } else {
        console.log(data);
        EnvironmentSatisfaction.value = data;
        forceRerender();
      }
    },
    (error) => {
      console.log("Exception:", error);
    },
  );

  ////////////////////////////////////
  // reFetch JobInvolvement Stats
  await useFetch(
    "/proxy/stats/v1/JobInvolvement/4"
    , {
    method: "get",
    params: {
      Attrition: attrition.value,
      Department: department.value,
      JobRole: jobRole.value,
    },
  }).then(
    (res) => {
      const data = res.data.value;
      const error = res.error.value;
      if (error) {
        console.log("ERROR:");
        console.log(error);
      } else {
        console.log(data);
        JobInvolvement.value = data;
        forceRerender();
      }
    },
    (error) => {
      console.log("Exception:", error);
    },
  );

  ////////////////////////////////////
  // reFetch JobSatisfaction Stats
  await useFetch(
    "/proxy/stats/v2/JobSatisfaction/4"
    , {
    method: "get",
    params: {
      Attrition: attrition.value,
      Department: department.value,
      JobRole: jobRole.value,
    },
  }).then(
    (res) => {
      const data = res.data.value;
      const error = res.error.value;
      if (error) {
        console.log("ERROR:");
        console.log(error);
      } else {
        console.log(data);
        JobSatisfaction.value = data;
        forceRerender();
      }
    },
    (error) => {
      console.log("Exception:", error);
    },
  );

  ////////////////////////////////////
  // reFetch PerformanceRating Stats
  await useFetch(
    "/proxy/stats/v2/PerformanceRating/4"
    , {
    method: "get",
    params: {
      Attrition: attrition.value,
      Department: department.value,
      JobRole: jobRole.value,
    },
  }).then(
    (res) => {
      const data = res.data.value;
      const error = res.error.value;
      if (error) {
        console.log("ERROR:");
        console.log(error);
      } else {
        console.log(data);
        PerformanceRating.value = data;
        forceRerender();
      }
    },
    (error) => {
      console.log("Exception:", error);
    },
  );

  ////////////////////////////////////
  // reFetch RelationshipSatisfaction Stats
  await useFetch(
    "/proxy/stats/v2/RelationshipSatisfaction/4"
    , {
    method: "get",
    params: {
      Attrition: attrition.value,
      Department: department.value,
      JobRole: jobRole.value,
    },
  }).then(
    (res) => {
      const data = res.data.value;
      const error = res.error.value;
      if (error) {
        console.log("ERROR:");
        console.log(error);
      } else {
        console.log(data);
        TrainingTimesLastYearStats.value = data;
        forceRerender();
      }
    },
    (error) => {
      console.log("Exception:", error);
    },
  );

  ////////////////////////////////////
  // reFetch YearsInCurrentRole Stats
  await useFetch(
    "/proxy/stats/v1/YearsInCurrentRole/10"
    , {
    method: "get",
    params: {
      Attrition: attrition.value,
      Department: department.value,
      JobRole: jobRole.value,
    },
  }).then(
    (res) => {
      const data = res.data.value;
      const error = res.error.value;
      if (error) {
        console.log("ERROR:");
        console.log(error);
      } else {
        console.log(data);
        YearsInCurrentRoleStats.value = data;
        forceRerender();
      }
    },
    (error) => {
      console.log("Exception:", error);
    },
  );
};
import { nextTick, ref } from "vue";
const renderComponent = ref(true);

const forceRerender = async () => {
  // Remove MyComponent from the DOM
  renderComponent.value = false;

  // Wait for the change to get flushed to the DOM
  await nextTick();

  // Add the component back in
  renderComponent.value = true;
};
</script>
