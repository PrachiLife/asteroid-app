<template>
    <div class="flex justify-center my-2 fixed w-full" v-if="showSnackbar">
        <div class="w-full sm:w-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center justify-between" role="alert">
            <span class="block sm:inline">{{ message }}</span>
        </div>
    </div>
</template>

<script>
import { ref, watch } from "vue";
import {message, status} from "@/api/Snackbar";
export default {
    setup() {
        const timeoutId = ref(null);
        const showSnackbar = ref(false);
        watch(status, (newValue) => {
            if (timeoutId.value) {
                clearTimeout(timeoutId);
            }
            if (newValue) {
                if (message.value) {
                  showSnackbar.value = true;
                }
                timeoutId.value = setTimeout(() => {
                    status.value = null;
                    message.value = null;
                    showSnackbar.value = false;
                }, 1500);
            }
        });

        return {
            showSnackbar,
            message
        }
    }
}
</script>