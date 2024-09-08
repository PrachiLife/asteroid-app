<script setup>
import StatForm from "./components/StatForm.vue";
import StatDetail from "./components/StatDetail.vue";
import StatGraph from "./components/StatGraph.vue";
import Snackbar from "./components/Snackbar.vue";
</script>

<template>
  <div>
    <Snackbar />
    <div class="m-2">
      <StatForm />
      <div class="my-4 w-fit">
        <StatDetail />
      </div>
      <div class="my-4">
        <StatGraph />
      </div>
    </div>
  </div>
</template>
