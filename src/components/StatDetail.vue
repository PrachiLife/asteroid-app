<template>
    <div class="flex flex-col gap-2 border p-2 rounded" v-if="allStatDetails && allStatDetails.length">
        <h1 class="font-bold">Stat Details</h1>
        <div>
           <h1 class="font-semibold">Fastest Asteroid:</h1>
            {{ result.fastest_velocity.name }} of ID {{ result.fastest_velocity.id }} is fastest asteroid with speed of {{  result.fastest_velocity?.asteroid_relative_velocity }}
        </div>
        <div>
            <h1 class="font-semibold">Closest Asteroid:</h1>
            {{ result.closest_asteroid.name }} of ID {{ result.closest_asteroid.id }} is closest asteroid with distance of {{ result.closest_asteroid?.asteroid_miss_distance }}
        </div>
        <div>
            <h1 class="font-semibold">Average Size of the Asteroids in kilometers:</h1>{{ result.average_asteroid_sizes }}
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

export default {
    setup() {
        const store = useStore();
        const result = ref({});
        const allStatDetails = computed(()=> {
            return store.getters.getStatDetails;
        })
        watch(()=>allStatDetails.value, ()=>{
            result.value = allStatDetails.value.reduce((acc,curr)=>{
                if(Number(acc.fastest_velocity.asteroid_relative_velocity)<Number(curr.asteroid_relative_velocity)){
                    acc.fastest_velocity = {...curr};
                }
                if(Number(acc.closest_asteroid.asteroid_miss_distance)>Number(curr.asteroid_miss_distance)){
                    acc.closest_asteroid = {...curr};
                }
                acc.all_asteriod_sizes = acc.all_asteriod_sizes + curr.asteroid_estimated_diameter.estimated_diameter_max + curr.asteroid_estimated_diameter.estimated_diameter_min;
                return acc;
            },{
                fastest_velocity: allStatDetails.value[0], 
                closest_asteroid: allStatDetails.value[0],
                all_asteriod_sizes:0,
              }
            )
            result.value = {
                ...result.value,
                average_asteroid_sizes: (result.value.all_asteriod_sizes/allStatDetails.value.length).toFixed(2),
            }
        })
        return {
            allStatDetails,
            result,
        }
    }
}
</script>