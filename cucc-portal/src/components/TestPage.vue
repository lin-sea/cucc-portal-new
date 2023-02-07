<template>
    <div>
        <div class="first">
            <sale-warning></sale-warning>
        </div>
        <div class="first">
            <year-order></year-order>
        </div>
    </div>
</template>

<script>
import SaleWarning from './home/saleWarning.vue'
import YearOrder from './home/yearOrder.vue'
export default {
    name:'Test',
    components: { SaleWarning,YearOrder },

}
</script>

<style lang='less' scoped>
    .first {
        width: 800px;
        margin: 0 auto;
    }
</style>