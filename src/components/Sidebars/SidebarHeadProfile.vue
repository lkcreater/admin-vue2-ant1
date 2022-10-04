<template>
    <a-row>
        <a-col :span="7">
            <a-avatar shape="square" icon="contacts" :size="50" :src="user.imageProfile"/>
        </a-col>
        <a-col :span="17" class="lk-logo-body-profile">
            <span class="lk-logo-title" >{{ user.fullname }}</span><br />
            <span class="lk-logo-body">
                <span>
                    <a-icon type="clock-circle" /> {{ dateTime() }}
                </span>
            </span>
        </a-col>
    </a-row>
</template>

<script>
import { mapGetters } from "vuex";
import moment from 'moment';

export default {
    computed: {
        ...mapGetters('auth', [
            'user',
        ])
    },
    methods: {
        dateTime() {
            return moment().format('MMM Do YY');
        },
    },
}
</script>

<style lang="scss">
.lk-logo-body-profile{
    .lk-logo-title{
        font-size: 14px;
        color: #FFF;
    }

    .lk-logo-body{
        color: #b5b5b5;
        font-size: 12px;
    }
}
</style>