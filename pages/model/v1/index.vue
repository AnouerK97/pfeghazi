<script setup>
import { ref } from 'vue'

const show = ref(false)

const formData = ref({
    Age: '',
    NumCompaniesWorked: '',
    TotalWorkingYears: '',
    TrainingTimesLastYear: '',
    YearsAtCompany: '',
    YearsInCurrentRole: '',
    DistanceFromHome: '',
    BusinessTravel: '',
    Department: '',
    Education: '',
    EducationField: '',
    JobRole: '',
    Gender: '',
    MaritalStatus: '',
})

const submitForm = async () => {
    // { data: responseData } =
    await useFetch('/proxy/model/v1', {
        method: 'post',
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
        }
    }).then((res) => {
      const data = res.data.value
      const error = res.error.value
      if (error) {
        console.log('ERROR:')
        console.log(error)
      } else {
        console.log('DATA:')
        console.log(data.prediction)
        show.value = true
       // prediction.value= data.prediction
      }
    }, (error) => {
      // Handle exception case
      console.log('Exception:', error)
    })
    //console.log(responseData)
    //prediction.value = responseData.prediction
    //console.log(prediction.value)
}
</script>

<template>
  <div class="rounded-lg border bg-card p-6">
    <h1>Model Version 1</h1>

    <PredictionModel v-if="show" :isOpen="show" :message="predection"/>


    <div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <form class="grid grid-cols-1 md:grid-cols-2 gap-6" @submit.prevent="submitForm">

          <div class="mb-1">
            <label for="Age" class="block mb-1 text-xs font-medium text-gray-900 dark:text-white">Age</label>
            <input
              v-model="formData.Age"
              type="number"
              id="Age"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
          </div>

            <div class="mb-1">
                <label for="NumCompaniesWorked" class="block mb-1 text-xs font-medium text-gray-900 dark:text-white">Number of Companies Worked</label>
                <input v-model="formData.NumCompaniesWorked"  type="number" id="NumCompaniesWorked" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>

            <div class="mb-1">
                <label for="TotalWorkingYears" class="block mb-1 text-xs font-medium text-gray-900 dark:text-white">Total Working Years</label>
                <input v-model="formData.TotalWorkingYears" type="number" id="TotalWorkingYears" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>

            <div class="mb-1">
                <label for="TrainingTimesLastYear" class="block mb-1 text-xs font-medium text-gray-900 dark:text-white">Training Times Last Year</label>
                <input v-model="formData.TrainingTimesLastYear" type="number" id="TrainingTimesLastYear" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>

            <div class="mb-1">
                <label for="YearsAtCompany" class="block mb-1 text-xs font-medium text-gray-900 dark:text-white">Years at Company</label>
                <input v-model="formData.YearsAtCompany" type="number" id="YearsAtCompany" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>

            <div class="mb-1">
                <label for="YearsInCurrentRole" class="block mb-1 text-xs font-medium text-gray-900 dark:text-white">Years in Current Role</label>
                <input v-model="formData.YearsInCurrentRole" type="number" id="YearsInCurrentRole" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>

            <div class="mb-1">
                <label for="DistanceFromHome" class="block mb-1 text-xs font-medium text-gray-900 dark:text-white">Distance From Home</label>
                <input  v-model="formData.DistanceFromHome" type="number" id="DistanceFromHome" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>

            <div class="mb-1">
                <label for="BusinessTravel" class="block mb-1 text-xs font-medium text-gray-900 dark:text-white">Business Travel</label>
                <select v-model="formData.BusinessTravel"  id="BusinessTravel" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    <option selected>Choose an option</option>
                    <option value="Rarely">Travel Rarely</option>
                    <option value="Frequently">Travel Frequently</option>
                    <option value="Never">Travel Never</option>
                </select>
            </div>

            <div class="mb-1">
                <label for="Department" class="block mb-1 text-xs font-medium text-gray-900 dark:text-white">Department</label>
                <select v-model="formData.Department" id="Department" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    <option selected>Choose a department</option>
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


            <div class="mb-1">
                <label for="Education" class="block mb-1 text-xs font-medium text-gray-900 dark:text-white">Education</label>
                <select v-model="formData.Education" id="Education" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    <option selected>Select education level</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>

            <div class="mb-1">
                <label for="EducationField" class="block mb-1 text-xs font-medium text-gray-900 dark:text-white">Education Field</label>
                <select v-model="formData.EducationField" id="EducationField" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    <option selected>Select education level</option>
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

            <div class="mb-1">
                <label for="JobRole" class="block mb-1 text-xs font-medium text-gray-900 dark:text-white">Job Role</label>
                <select v-model="formData.JobRole" id="JobRole" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    <option selected>Select job level</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                    <option value="Manager">Manager</option>
                    <option value="Director">Director</option>
                    <option value="Partner">Partner</option>
                </select>
            </div>


            <div class="mb-1">
                <label for="Gender" class="block mb-1 text-xs font-medium text-gray-900 dark:text-white">Gender</label>
                <select v-model="formData.Gender" id="Gender" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    <option selected>Select gender</option>
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                </select>
            </div>
            <div class="mb-1">
                <label for="MaritalStatus" class="block mb-1 text-xs font-medium text-gray-900 dark:text-white">Marital Status</label>
                <select v-model="formData.MaritalStatus" id="MaritalStatus" class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    <option selected>Select marital status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                </select>
            </div>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 col-span-2">Submit</button>
        </form>
      </div>
  </div>
</template>


