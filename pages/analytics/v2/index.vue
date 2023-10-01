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
      <Charts-DoughnutChart
        :data="BusinessTravelStats"
        v-if="renderComponent"
        name="Business Travel Distribuation"
      />
      <Charts-DoughnutChart
        :data="DepartmentStats"
        v-if="renderComponent"
        name="Department Distribuation"
      />
      <Charts-DoughnutChart
        :data="JobRoleStats"
        v-if="renderComponent"
        name="Job Roled Stats Distribuation"
      />
    </section>
    <section class="mb-5 grid gap-5 md:grid-cols-3">
      <Charts-DoughnutChart
        :data="TotalWorkingYearsStats"
        v-if="renderComponent"
        name="Total Working Years Distribuation"
      />
      <Charts-DoughnutChart
        :data="TrainingTimesLastYearStats"
        v-if="renderComponent"
        name="Training Times Last Year Distribuation"
      />
      <Charts-DoughnutChart
        :data="YearsAtCompanyStats"
        v-if="renderComponent"
        name="Years At Company Distribuation"
      />
    </section>
    <Charts-LineChart
      :data="YearsInCurrentRoleStats"
      v-if="renderComponent"
      name="Years In Current Role Distribuation"
    />
  </div>
</template>

<script setup lang="ts">
const attrition = ref("");
const department = ref("");
const jobRole = ref("");

const { data: BusinessTravelStats } = await useFetch(
  "/proxy/stats/v1/BusinessTravel/3",
  {
    method: "get",
  },
);

const { data: DepartmentStats } = await useFetch(
  "/proxy/stats/v1/Department/13",
  {
    method: "get",
  },
);

const { data: JobRoleStats } = await useFetch("/proxy/stats/v1/JobRole/5", {
  method: "get",
});

const { data: TotalWorkingYearsStats } = await useFetch(
  "/proxy/stats/v1/TotalWorkingYears/10",
  {
    method: "get",
  },
);
const { data: TrainingTimesLastYearStats } = await useFetch(
  "/proxy/stats/v1/TrainingTimesLastYear/10",
  {
    method: "get",
  },
);
const { data: YearsAtCompanyStats } = await useFetch(
  "/proxy/stats/v1/YearsAtCompany/10",
  {
    method: "get",
  },
);
const { data: YearsInCurrentRoleStats } = await useFetch(
  "/proxy/stats/v1/YearsInCurrentRole/10",
  {
    method: "get",
  },
);

const filter = async () => {
  ////////////////////////////////////
  // reFetch BusinessTravel Stats
  await useFetch("/proxy/stats/v1/BusinessTravel/3", {
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
        BusinessTravelStats.value = data;
        forceRerender();
      }
    },
    (error) => {
      console.log("Exception:", error);
    },
  );

  ////////////////////////////////////
  // reFetch DepartmentStats Stats
  await useFetch("/proxy/stats/v1/Department/13", {
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
        DepartmentStats.value = data;
        forceRerender();
      }
    },
    (error) => {
      console.log("Exception:", error);
    },
  );

  ////////////////////////////////////
  // reFetch JobRole Stats
  await useFetch("/proxy/stats/v1/JobRole/8", {
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
        JobRoleStats.value = data;
        forceRerender();
      }
    },
    (error) => {
      console.log("Exception:", error);
    },
  );

  ////////////////////////////////////
  // reFetch TotalWorkingYears Stats
  await useFetch("/proxy/stats/v1/TotalWorkingYears/10", {
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
        TotalWorkingYearsStats.value = data;
        forceRerender();
      }
    },
    (error) => {
      console.log("Exception:", error);
    },
  );

  ////////////////////////////////////
  // reFetch YearsAtCompany Stats
  await useFetch("/proxy/stats/v1/YearsAtCompany/10", {
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
  await useFetch("/proxy/stats/v1/YearsInCurrentRole/10", {
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
