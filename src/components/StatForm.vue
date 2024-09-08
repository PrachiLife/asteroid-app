<template>
    <form class="m-2 flex flex-col gap-2" @submit.prevent="submitStatForm()">
        <div class="sm:col-span-4">
            <label for="startDate" class="block text-sm font-medium leading-6 text-gray-900">Start Date</label>
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                <input v-model="statDate.start_date" type="date" id="startDate" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm" required :max="statDate.end_date">
            </div>
        </div>
        <div class="sm:col-span-4">
            <label for="endDate" class="block text-sm font-medium leading-6 text-gray-900">End Date</label>
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                <input v-model="statDate.end_date" type="date" id="endDate" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm" required :min="statDate.start_date">
            </div>
        </div>
        <button type="submit" class="w-[100px] rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Submit</button>
    </form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
    setup() {
        const store = useStore();
        const statDate = ref({});
        const submitStatForm = () =>{
            store.dispatch('getStatDetails', statDate.value);
        }; 
        return {
            statDate,
            submitStatForm,
        }
    }
}
</script>