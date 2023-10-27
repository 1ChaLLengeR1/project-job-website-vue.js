<template>
    <ul class="w-full flex flex-col gap-3 p-3 bg-color-bg rounded-3xl">
        <item-list v-for="item in array_shop_list" :key="item.id" :name="item.name" :amount="item.amount" :model="item.model" :type="item.type"></item-list>
    </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'


//componets
import ItemListVue from './ShopListComponets/ItemList.vue'


interface arrayObject{
    id:string,
    name:string,
    amount:number,
    model:string,
    type:boolean

}

export default defineComponent({
    props:{
        array_shop_list:{
            required: true,
            type: Array<arrayObject>
        }
    },
    components:{
        'item-list':ItemListVue
    },
    setup () {
        

        return {}
    }
})
</script>

<style scoped>

</style>