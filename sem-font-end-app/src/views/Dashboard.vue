<template>
<div class="">
    <TopNavabar />
    <div class="dashboard" style="float: right;">
        <Sidebar/>
        <div class="cnt">
            <router-view/>
        </div>
    </div>
</div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import TopNavabar from '../views/TopNavabar'
export default {
    components: {
        Sidebar,
        TopNavabar,
    }
}
</script>

<style scoped>
.dashboard {
    display: grid;
    grid-template-columns: 1fr 5fr;
    background-color: white;
    height: 100vh;
    width: 100vw;
}

.cnt {
    background-color: white;
    /* border-radius: 10px; */
    margin: 0px 0px 0px 0px;
    width: 1500px;
    display:block;

}
body {
    background-color: white;
}

</style>