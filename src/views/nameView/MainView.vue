<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">
                NAVBAR
            </b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item :to="{name:'second',params: { id: '1' }}">First</b-nav-item>
                  
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <router-view class="view one"></router-view>
        <router-view class="view two" name="a"></router-view>
        <router-view class="view three" name="b"></router-view>
    </div>
</template>

<script>
import  {
    BNavbar,
    BNavbarBrand,
    BNavbarNav,
    BCollapse,
    BNavbarToggle,
    BNavItem
} from 'bootstrap-vue';
    export default {
        components: {
            BNavbar,
            BNavbarBrand,
            BNavbarNav,
            BCollapse,
            BNavbarToggle,
            BNavItem
        }
    }
</script>

