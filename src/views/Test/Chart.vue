<template>
    <div>
        <chartjs-doughnut 
        :labels="label" 
        :datasets="datasets" 
        :option="option"
        :height="50"
        >
          
        </chartjs-doughnut>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            label: [
                'High',
                'Low',
                'Medium'
            ],
            datasets: [
                {
                    data: [],
                    backgroundColor: [
                        'Red',
                        'Green',
                        'Yellow'
                    ]
                }
            ],
            option: {

                title: {
                    display: true,
                    postition: 'center',
                    text: 'Todo'
                }
            },
        }
    },
    async mounted() {
        await axios.post("todo/list").then((success) => {
            //console.log(success.data.data.priority)
            let priority = success.data.data.priority;
            Object.values(priority).forEach((val,index) => {
                this.datasets[0].data[index] = val;
            })
        });
    }
}
</script>

<style></style>