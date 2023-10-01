<template>
  <div>
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

    <section class="mb-5 grid gap-5 md:grid-cols-5">
      <!-- Gender Male -->
      <div class="rounded-lg border bg-card p-6">
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium">Male</p>
        </div>
        <p class="mt-1.5 text-xl font-extrabold">{{ male }}</p>
        <p class="text-xs text-muted-foreground">Employee</p>
      </div>
      <!-- Gender Female -->
      <div class="rounded-lg border bg-card p-6">
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium">Female</p>
        </div>
        <p class="mt-1.5 text-xl font-extrabold">{{ female }}</p>
        <p class="text-xs text-muted-foreground">Employee</p>
      </div>
      <!-- Single -->
      <div class="rounded-lg border bg-card p-6">
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium">Single</p>
        </div>
        <p class="mt-1.5 text-xl font-extrabold">{{ single }}</p>
        <p class="text-xs text-muted-foreground">Employee</p>
      </div>
      <!-- Married -->
      <div class="rounded-lg border bg-card p-6">
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium">Married</p>
        </div>
        <p class="mt-1.5 text-xl font-extrabold">{{ married }}</p>
        <p class="text-xs text-muted-foreground">Employee</p>
      </div>
      <!-- Divorced -->
      <div class="rounded-lg border bg-card p-6">
        <div class="flex items-center justify-between">
          <p class="text-sm font-medium">Divorced</p>
        </div>
        <p class="mt-1.5 text-xl font-extrabold">{{ divorced }}</p>
        <p class="text-xs text-muted-foreground">Employee</p>
      </div>
    </section>
    <section class="mb-5 grid gap-5 md:grid-cols-2">
      <Charts-BarChart
        :data="AgeStats"
        v-if="renderComponent"
        name="Age Distribuation"
      />
      <Charts-BarChart
        :data="NumCompaniesWorkedStats"
        v-if="renderComponent"
        name="Number of Companies Worked Distribuation"
      />
      <Charts-DoughnutChart
        :data="EducationStats"
        v-if="renderComponent"
        name="Education Distribuation"
      />
      <Charts-DoughnutChart
        :data="EducationFieldStats"
        v-if="renderComponent"
        name="EducationField Distribuation"
      />
    </section>
    <Charts-LineChart
      :data="DistanceFromHomeStats"
      v-if="renderComponent"
      name="Distance From Home Distribuation"
    />
  </div>
</template>

<script setup lang="ts">
const attrition = ref("");
const department = ref("");
const jobRole = ref("");
const male = ref(0);
const female = ref(0);
const single = ref(0);
const married = ref(0);
const divorced = ref(0);

//const { data: male, data: female } =
await useFetch("/proxy/data/v1", {
  method: "get",
}).then(
  (res) => {
    const data = res.data.value;
    const error = res.error.value;
    if (error) {
      male.value = "NA";
      female.value = "NA";
      single.value = "NA";
      married.value = "NA";
      divorced.value = "NA";
    } else {
      // Calculate the length of objects where Gender is 'Single'
      const signleData = data.data.filter(
        (item) => item.MaritalStatus === "Single",
      );
      single.value = signleData.length;

      // Calculate the length of objects where Gender is 'Married'
      const marriedData = data.data.filter(
        (item) => item.MaritalStatus === "Married",
      );
      married.value = marriedData.length;

      // Calculate the length of objects where Gender is 'Divorced'
      const divorcedData = data.data.filter(
        (item) => item.MaritalStatus === "Divorced",
      );
      divorced.value = divorcedData.length;

      // Calculate the length of objects where Gender is 'Male'
      const maleData = data.data.filter((item) => item.Gender === "Male");
      male.value = maleData.length;

      // Calculate the length of objects where Gender is 'Female'
      const femaleData = data.data.filter((item) => item.Gender === "Female");
      female.value = femaleData.length;
    }
  },
  (error) => {
    // Handle exception case
    male.value = "error";
    female.value = "error";
    console.log("Exception:", error);
  },
);

const { data: AgeStats } = await useFetch("/proxy/stats/v1/Age/10", {
  method: "get",
});

const { data: DistanceFromHomeStats } = await useFetch(
  "/proxy/stats/v1/DistanceFromHome/10",
  {
    method: "get",
  },
);
const { data: NumCompaniesWorkedStats } = await useFetch(
  "/proxy/stats/v1/NumCompaniesWorked/8",
  {
    method: "get",
  },
);
const { data: EducationStats } = await useFetch("/proxy/stats/v1/Education/5", {
  method: "get",
});

const { data: EducationFieldStats } = await useFetch(
  "/proxy/stats/v1/EducationField/13",
  {
    method: "get",
  },
);

const filter = async () => {
  ////////////////////////////////////
  // reFetch Age Stats
  await useFetch("/proxy/stats/v1/Age/10", {
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
        AgeStats.value = data;
        forceRerender();
      }
    },
    (error) => {
      console.log("Exception:", error);
    },
  );

  ////////////////////////////////////
  // reFetch DistanceFromHome Stats
  await useFetch("/proxy/stats/v1/DistanceFromHome/10", {
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
        DistanceFromHomeStats.value = data;
        forceRerender();
      }
    },
    (error) => {
      console.log("Exception:", error);
    },
  );

  ////////////////////////////////////
  // reFetch NumCompaniesWorked Stats
  await useFetch("/proxy/stats/v1/NumCompaniesWorked/8", {
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
        NumCompaniesWorkedStats.value = data;
        forceRerender();
      }
    },
    (error) => {
      console.log("Exception:", error);
    },
  );

  ////////////////////////////////////
  // reFetch Age Stats
  await useFetch("/proxy/stats/v1/Education/5", {
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
        EducationStats.value = data;
        forceRerender();
      }
    },
    (error) => {
      console.log("Exception:", error);
    },
  );

  ////////////////////////////////////
  // reFetch Age Stats
  await useFetch("/proxy/stats/v1/EducationField/13", {
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
        EducationFieldStats.value = data;
        forceRerender();
      }
    },
    (error) => {
      console.log("Exception:", error);
    },
  );

  ////////////////////////////////////
  // reFetch Data
  await useFetch("/proxy/data/v1", {
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
        male.value = "NA";
        female.value = "NA";
        single.value = "NA";
        married.value = "NA";
        divorced.value = "NA";
      } else {
        const signleData = data.data.filter(
          (item) => item.MaritalStatus === "Single",
        );
        single.value = signleData.length;

        // Calculate the length of objects where Gender is 'Married'
        const marriedData = data.data.filter(
          (item) => item.MaritalStatus === "Married",
        );
        married.value = marriedData.length;

        // Calculate the length of objects where Gender is 'Divorced'
        const divorcedData = data.data.filter(
          (item) => item.MaritalStatus === "Divorced",
        );
        divorced.value = divorcedData.length;

        // Calculate the length of objects where Gender is 'Male'
        const maleData = data.data.filter((item) => item.Gender === "Male");
        male.value = maleData.length;

        // Calculate the length of objects where Gender is 'Female'
        const femaleData = data.data.filter((item) => item.Gender === "Female");
        female.value = femaleData.length;
      }
    },
    (error) => {
      // Handle exception case
      male.value = "error";
      female.value = "error";
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
