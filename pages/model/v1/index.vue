<script setup>
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const isOpen = ref(false);

const prediction = ref("");

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}

const show = ref(false);

const formData = ref({
  Age: "",
  NumCompaniesWorked: "",
  TotalWorkingYears: "",
  TrainingTimesLastYear: "",
  YearsAtCompany: "",
  YearsInCurrentRole: "",
  DistanceFromHome: "",
  BusinessTravel: "",
  Department: "",
  Education: "",
  EducationField: "",
  JobRole: "",
  Gender: "",
  MaritalStatus: "",
});

const submitForm = async () => {
  // { data: responseData } =
  await useFetch("/proxy/model/v1", {
    method: "post",
    body: {
      Age: formData.value.Age,
      NumCompaniesWorked: formData.value.NumCompaniesWorked,
      TotalWorkingYears: formData.value.TotalWorkingYears,
      TrainingTimesLastYear: formData.value.TrainingTimesLastYear,
      YearsAtCompany: formData.value.YearsAtCompany,
      YearsInCurrentRole: formData.value.YearsInCurrentRole,
      DistanceFromHome: formData.value.DistanceFromHome,
      BusinessTravel: formData.value.BusinessTravel,
      Department: formData.value.Department,
      Education: formData.value.Education,
      EducationField: formData.value.EducationField,
      JobRole: formData.value.JobRole,
      Gender: formData.value.Gender,
      MaritalStatus: formData.value.MaritalStatus,
    },
  }).then(
    (res) => {
      const data = res.data.value;
      const error = res.error.value;
      if (error) {
        console.log("ERROR:");
        console.log(error);
        prediction.value = "error";
      } else {
        console.log("DATA:");
        console.log(data.prediction);
        prediction.value = data.prediction;
        // prediction.value= data.prediction
      }
    },
    (error) => {
      // Handle exception case
      prediction.value = "error";
      console.log("Exception:", error);
    },
  );
  openModal();
  //console.log(responseData)
  //prediction.value = responseData.prediction
  //console.log(prediction.value)
};

const generateRandomValues = () => {
  // Generate random values for your form fields
  formData.value.Age = Math.floor(Math.random() * 100); // Example for Age
  formData.value.NumCompaniesWorked = Math.floor(Math.random() * 10);
  formData.value.TotalWorkingYears = Math.floor(Math.random() * 40); // Example for TotalWorkingYears
  formData.value.TrainingTimesLastYear = Math.floor(Math.random() * 5); // Example for TrainingTimesLastYear
  formData.value.YearsAtCompany = Math.floor(Math.random() * 20); // Example for YearsAtCompany
  formData.value.YearsInCurrentRole = Math.floor(Math.random() * 10); // Example for YearsInCurrentRole
  formData.value.DistanceFromHome = Math.floor(Math.random() * 30); // Example for DistanceFromHome

  // For BusinessTravel, select a random option
  const businessTravelOptions = ["Rarely", "Frequently", "Never"];
  formData.value.BusinessTravel =
    businessTravelOptions[
      Math.floor(Math.random() * businessTravelOptions.length)
    ];

  // For Department, select a random option
  const departmentOptions = [
    "DealAdvisory",
    "ITS",
    "Marketing",
    "HR",
    "TECH",
    "ITA",
    "Legal",
    "Consulting",
    "Sales",
    "TAX",
    "AAS",
    "Audit",
    "Payrol",
  ];
  formData.value.Department =
    departmentOptions[Math.floor(Math.random() * departmentOptions.length)];

  formData.value.Education = Math.floor(Math.random() * 5) + 1; // Example for Education (1-5)

  // For EducationField, select a random option
  const educationFieldOptions = [
    "Finance",
    "Economie",
    "Gestion",
    "Informatique",
    "HR",
    "Comptabilite",
    "Marketing",
    "Audit",
    "DataScience",
    "Management",
    "Droit",
    "Fiscalite",
    "Administration",
  ];
  formData.value.EducationField =
    educationFieldOptions[
      Math.floor(Math.random() * educationFieldOptions.length)
    ];

  // For JobRole, select a random option
  const jobRoleOptions = ["Junior", "Senior", "Manager", "Director", "Partner"];
  formData.value.JobRole =
    jobRoleOptions[Math.floor(Math.random() * jobRoleOptions.length)];

  formData.value.Gender = Math.random() < 0.5 ? "0" : "1"; // Randomly choose "0" (Female) or "1" (Male)

  // For MaritalStatus, select a random option
  const maritalStatusOptions = ["Single", "Married", "Divorced"];
  formData.value.MaritalStatus =
    maritalStatusOptions[
      Math.floor(Math.random() * maritalStatusOptions.length)
    ];
};
</script>

<template>
  <div class="rounded-lg border bg-card p-6">
    <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
      Predection Form - Model Version 1.0
    </h1>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  Resultat
                </DialogTitle>

                <div class="text-l mb-4">
                  Probabilité du départ de l'employé est:
                </div>

                <!-- Display the result percentage with larger text -->
                <div class="text-4xl font-bold text-blue-500 mb-4">
                  {{ prediction }} %
                </div>

                <div class="mt-4">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="closeModal"
                  >
                    Got it, thanks!
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <form class="" @submit.prevent="submitForm">
        <div class="mb-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Individual Factors
          </h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <!-- Age -->
          <div class="mb-1">
            <label
              for="Age"
              class="block mb-1 text-xs font-medium text-gray-900 dark:text-white"
              >Age</label
            >
            <input
              v-model="formData.Age"
              type="number"
              id="Age"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <!-- Gender -->
          <div class="mb-1">
            <label
              for="Gender"
              class="block mb-1 text-xs font-medium text-gray-900 dark:text-white"
              >Gender</label
            >
            <select
              v-model="formData.Gender"
              id="Gender"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="1">Male</option>
              <option value="0">Female</option>
            </select>
          </div>

          <!-- Marital Status -->
          <div class="mb-1">
            <label
              for="MaritalStatus"
              class="block mb-1 text-xs font-medium text-gray-900 dark:text-white"
              >Marital Status</label
            >
            <select
              v-model="formData.MaritalStatus"
              id="MaritalStatus"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>
          <!-- Distance From Home -->
          <div class="mb-1">
            <label
              for="DistanceFromHome"
              class="block mb-1 text-xs font-medium text-gray-900 dark:text-white"
              >Distance From Home</label
            >
            <input
              v-model="formData.DistanceFromHome"
              type="number"
              id="DistanceFromHome"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <!-- Number of Companies Worked -->
          <div class="mb-1">
            <label
              for="NumCompaniesWorked"
              class="block mb-1 text-xs font-medium text-gray-900 dark:text-white"
              >Number of Companies Worked</label
            >
            <input
              v-model="formData.NumCompaniesWorked"
              type="number"
              id="NumCompaniesWorked"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <!-- Education -->
          <div class="mb-1">
            <label
              for="Education"
              class="block mb-1 text-xs font-medium text-gray-900 dark:text-white"
              >Education</label
            >
            <select
              v-model="formData.Education"
              id="Education"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <!-- Education Field -->
          <div class="mb-1">
            <label
              for="EducationField"
              class="block mb-1 text-xs font-medium text-gray-900 dark:text-white"
              >Education Field</label
            >
            <select
              v-model="formData.EducationField"
              id="EducationField"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="Finance">Finance</option>
              <option value="Economie">Economie</option>
              <option value="Gestion">Gestion</option>
              <option value="Informatique">Informatique</option>
              <option value="HR">Ressources Humaines</option>
              <option value="Comptabilite">Comptabilite</option>
              <option value="Marketing">Marketing</option>
              <option value="Audit">Audit</option>
              <option value="DataScience">Data Science</option>
              <option value="Management">Management</option>
              <option value="Droit">Droit</option>
              <option value="Fiscalite">Fiscalite</option>
              <option value="Administration">Administration</option>
            </select>
          </div>
        </div>

        <!-- Additional Information -->
        <div class="mb-6 mt-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Organizational Factors
          </h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <!-- Business Travel -->
          <div class="mb-1">
            <label
              for="BusinessTravel"
              class="block mb-1 text-xs font-medium text-gray-900 dark:text-white"
              >Business Travel</label
            >
            <select
              v-model="formData.BusinessTravel"
              id="BusinessTravel"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="Rarely">Travel Rarely</option>
              <option value="Frequently">Travel Frequently</option>
              <option value="Never">Travel Never</option>
            </select>
          </div>

          <!-- Department -->
          <div class="mb-1">
            <label
              for="Department"
              class="block mb-1 text-xs font-medium text-gray-900 dark:text-white"
              >Department</label
            >
            <select
              v-model="formData.Department"
              id="Department"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
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
          <!-- Total Working Years -->
          <div class="mb-1">
            <label
              for="TotalWorkingYears"
              class="block mb-1 text-xs font-medium text-gray-900 dark:text-white"
              >Total Working Years</label
            >
            <input
              v-model="formData.TotalWorkingYears"
              type="number"
              id="TotalWorkingYears"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <!-- Training Times Last Year -->
          <div class="mb-1">
            <label
              for="TrainingTimesLastYear"
              class="block mb-1 text-xs font-medium text-gray-900 dark:text-white"
              >Training Times Last Year</label
            >
            <input
              v-model="formData.TrainingTimesLastYear"
              type="number"
              id="TrainingTimesLastYear"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <!-- Job Role -->
          <div class="mb-1">
            <label
              for="JobRole"
              class="block mb-1 text-xs font-medium text-gray-900 dark:text-white"
              >Job Role</label
            >
            <select
              v-model="formData.JobRole"
              id="JobRole"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="Partner">Partner</option>
            </select>
          </div>
          <!-- Years at Company -->
          <div class="mb-1">
            <label
              for="YearsAtCompany"
              class="block mb-1 text-xs font-medium text-gray-900 dark:text-white"
              >Years at Company</label
            >
            <input
              v-model="formData.YearsAtCompany"
              type="number"
              id="YearsAtCompany"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <!-- Years in Current Role -->
          <div class="mb-1">
            <label
              for="YearsInCurrentRole"
              class="block mb-1 text-xs font-medium text-gray-900 dark:text-white"
              >Years in Current Role</label
            >
            <input
              v-model="formData.YearsInCurrentRole"
              type="number"
              id="YearsInCurrentRole"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </div>

        <!-- Buttons -->
        <div class="col-span-3">
          <!-- Flex container for buttons -->
          <div class="flex justify-end items-center">
            <button
              type="button"
              class="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              @click="generateRandomValues"
            >
              Generate Random Values
            </button>
            <button
              type="submit"
              class="ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
