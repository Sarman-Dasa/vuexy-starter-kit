<template>
    <div>
        <chartjs-doughnut
        :labels="label"
        :datasets="datasets"
        :option="option"
        >

        </chartjs-doughnut>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                label:[
                    'High',
                    'Low',
                    'Medium'
                ],
                datasets:[
                    {
                        data:[20,30,50],
                        backgroundColor:[
                            'Red',
                            'Green',
                            'Yellow'
                        ]
                    }
                ],
                option:{
                    
                    title:{
                        display:true,
                        postition:'center',
                        text:'Todo'
                    }
                }
            }
        }
    }
</script>

<style>

</style>