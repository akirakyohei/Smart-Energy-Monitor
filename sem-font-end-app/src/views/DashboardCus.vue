<template>
<div class="">
    <TopNavCus />
    <div class="dashboard" style="float: right;">
        <Sidebarcus />
        <div class="cnt">
            <router-view/>
        </div>
    </div>
</div>
</template>

<script>
import Sidebarcus from '../components/Sidebarcus'
import TopNavCus from '../views/TopNavCus'
export default {
    components: {
        Sidebarcus,
        TopNavCus,
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