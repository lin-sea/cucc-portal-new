<template>
    <div style="width:100%;height: 100%;">
        <el-amap class="vueAmap" vid="amapEdit" :zoom="amap.zoom" :center="amap.center" :mapStyle="amap.mapStyle"
            :plugin="amap.plugin" :events="amap.events" :dragEnable="false" :zoomEnable="false">
            <el-amap-marker v-for="(marker, index) in amap.markers" :key="'marker' + index" :position="marker.position"
                :content="marker.content">
            </el-amap-marker>
            <el-amap-info-window v-if="showWindow" ref="windowRef" :position="window.position" :visible="true"
                :offset="[225, 210]">
                <div class="window-ctn">
                    <div class="window">
                        <div class="li title">标题</div>
                    </div>
                </div>
            </el-amap-info-window>
            <el-amap-text v-for="(marker, index) in amap.markers" :key="'text' + index" :text="marker.text"
                :offset="marker.offset" :position="marker.position"></el-amap-text>
        </el-amap>
    </div>
</template>

<script>
export default {
    name: 'Amap',

    data() {
        return {
            amap: {
                zoom: 11.38,
                center: [118.874308, 31.973307],
                events: {
                    click(e) {
                        vm.mapClick(e.lnglat.lng, e.lnglat.lat)
                    }
                },
                plugin: ['ToolBar'],
                markers: [
                    {
                        position: [118.893915, 31.95293], content: `<div style="color: blue; font-size: 32px; width: 200px; text-align: left">
                    <i class="el-icon-location"></i>
                    科学园站
                    </div>` },
                    {
                        position: [118.617706, 32.151516], content: `<div style="color: blue; font-size: 32px; width: 200px; text-align: left">
                    <i class="el-icon-location"></i>
                    永宁站
                    </div>` },
                    {
                        position: [118.876457, 32.291848], content: `<div style="color: blue; font-size: 32px; width: 200px; text-align: left">
                    <i class="el-icon-location"></i>
                   雄州站
                    </div>` },
                    {
                        position: [118.854607, 32.160157], content: `<div style="color: blue; font-size: 32px; width: 200px; text-align: left">
                    <i class="el-icon-location"></i>
                    海华站
                    </div>` },
                    {
                        position: [118.428524, 31.935964], content: `<div style="color: blue; font-size: 32px; width: 200px; text-align: left">
                    <i class="el-icon-location"></i>
                    桥林站
                    </div>` },
                    {
                        position: [118.87121, 31.996243], content: `<div style="color: blue; font-size: 32px; width: 200px; text-align: left">
                    <i class="el-icon-location"></i>
                    高桥站
                    </div>` },
                    {
                        position: [118.874308, 31.973307], content: `<div style="color: blue; font-size: 32px; width: 200px; text-align: left">
                    <i class="el-icon-location"></i>
                    中联总部
                    </div>` },
                    {
                        position: [118.972003, 31.963833], content: `<div style="color: blue; font-size: 32px; width: 200px; text-align: left">
                    <i class="el-icon-location"></i>
                    中联站
                    </div>` },
                    {
                        position: [119.024884, 31.981893], content: `<div style="color: blue; font-size: 32px; width: 200px; text-align: left">
                    <i class="el-icon-location"></i>
                    上峰站
                    </div>` },
                    {
                        position: [119.098251, 31.93314], content: `<div style="color: blue; font-size: 32px; width: 200px; text-align: left">
                    <i class="el-icon-location"></i>
                    土桥站
                    </div>` },
                    {
                        position: [118.596315, 31.795842], content: `<div style="color: blue; font-size: 32px; width: 200px; text-align: left">
                    <i class="el-icon-location"></i>
                    铜井站
                    </div>` },
                    {
                        position: [118.843444, 31.808122], content: `<div style="color: blue; font-size: 32px; width: 200px; text-align: left">
                    <i class="el-icon-location"></i>
                    秣陵站
                    </div>` },
                    {
                        position: [118.831732, 31.707781], content: `<div style="color: blue; font-size: 32px; width: 200px; text-align: left">
                    <i class="el-icon-location"></i>
                    禄口站
                    </div>` },
                    {
                        position: [119.057086, 31.683898], content: `<div style="color: blue; font-size: 32px; width: 200px; text-align: left">
                    <i class="el-icon-location"></i>
                    溧水站
                    </div>` },
                    {
                        position: [118.55537,31.814959], content: `<div style="color: blue; font-size: 32px; width: 300px; text-align: left">
                    <i class="el-icon-location"></i>
                    双龙南京分公司
                    </div>` },
                    {
                        position: [118.897826,31.965852], content: `<div style="color: blue; font-size: 32px; width: 300px; text-align: left">
                    <i class="el-icon-location"></i>
                    双龙东山分公司
                    </div>` },
                    {
                        position: [118.825696,32.250675], content: `<div style="color: blue; font-size: 32px; width: 300px; text-align: left">
                    <i class="el-icon-location"></i>
                    双龙江北分公司
                    </div>` },
                    {
                        position: [119.021389,31.774675], content: `<div style="color: blue; font-size: 32px; width: 300px; text-align: left">
                    <i class="el-icon-location"></i>
                    双龙溧水分公司
                    </div>` },
                    {
                        position: [118.565409,31.998688], content: `<div style="color: blue; font-size: 32px; width: 300px; text-align: left">
                    <i class="el-icon-location"></i>
                    双龙双猴分公司
                    </div>` },
                    {
                        position: [118.925515,32.134998], content: `<div style="color: blue; font-size: 32px; width: 300px; text-align: left">
                    <i class="el-icon-location"></i>
                    双龙栖霞分公司
                    </div>` },
                    {
                        position: [118.818809,31.947797], content: `<div style="color: blue; font-size: 32px; width: 300px; text-align: left">
                    <i class="el-icon-location"></i>
                    双龙集团总部
                    </div>` },

                ]
            },

        }

    },
}
</script>

<style>
</style>