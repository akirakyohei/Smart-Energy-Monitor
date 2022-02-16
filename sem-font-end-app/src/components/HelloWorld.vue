<template>
<div class="about-wrapper">
        <div class="about-left">
            <div class="about-left-content">
                <div>
                    <div class="shadow">
                        <div class="about-img">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy_Eoydl72AHQ_0JA75NTVpkhqWdIO7Zj0D4lPGMCIC0ice4xPFnDvFWCjoPCjlsCTcMQ&usqp=CAU" alt="about image">
                        </div>
                    </div>

                    <h2>MANAGE your home's Electricity</h2>
                    <h3>Your professional website</h3>
                </div>

                <ul class="icons">
                    <li><i class="fab fa-facebook-f"></i></li>
                    <li><i class="fab fa-twitter"></i></li>
                    <li><i class="fab fa-linkedin"></i></li>
                    <li><i class="fab fa-instagram"></i></li>
                </ul>
            </div>

        </div>

        <div class="about-right">
            <h1>What is the state of power consumption<span>?</span></h1>
            <h2>I make everything easy for you</h2>
            <div class="about-btns">
                  <router-link to="/signin" tag="button" class="btn btn-pink">LOG IN</router-link>
                  <router-link to="/signup" tag="button" class="btn btn-white" disabled>REGISTER</router-link>
            </div>

            <div class="about-para">
                <p>Create clear, multi-functional to-do lists to easily manage your ideas and work from anywhere so you never forget anything again.</p>
                <p>Save any list as a template to reuse and customize as many times as you want. You can even create recurring tasks with saved checklists for error-free processes.</p>
            </div>
            <div class="credit" style="margin-top: 50px;">Made with <span style="color:tomato">❤</span> Developer</div>
        </div>
    </div>
</template>

<script>
export default {
};
</script>