<template>
    <div class="h-[50vh]">
        <canvas id="myChart"></canvas>
    </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import Chart from 'chart.js/auto';

export default {

    setup() {
        const myChart = ref(null);
        const store = useStore();
        const result = ref({});
        const allStatDetails = computed(()=> {
            return store.getters.getStatDetails;
        })
        watch(()=>allStatDetails.value, ()=>{
            result.value = allStatDetails.value.reduce((acc,curr)=>{
                let index= acc.findIndex((obj)=>obj.date == curr.date);
                if(index!=-1) {
                    acc[index].count++;
                } else {
                    acc.push({ date:curr.date, count:1});
                }
                return acc;
            },[]);
            result.value = result.value.sort((a,b)=>new Date(a.date) - new Date(b.date))
            if(myChart.value) {
                myChart.value.destroy();
            }
            const ctx = document.getElementById('myChart');
            myChart.value =new Chart(ctx, {
            type: 'bar',
            data: {
                labels: result.value.map((item)=>item.date),
                datasets: [{
                label: '# of asteroids',
                data: result.value.map((item)=>item.count),
                borderWidth: 1
                }]
            },
            options: {
                scales: {
                y: {
                    beginAtZero: true
                }
                }
            }
            });
        })
    }
}
</script>