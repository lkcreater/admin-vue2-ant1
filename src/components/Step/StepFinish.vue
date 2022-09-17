<template>
    <div>
        <a-result
            :status="status"
            :title="title"
            sub-title="Please check your information again.">

            <a-avatar shape="square" :src="image(data.image)" :size="100" icon="user" />

            <a-row style="margin-top: 20px;">
                <a-col :span="12" :offset="6">
                    <hr class="gradient-line">
                    <a-descriptions 
                        title="User Info" 
                        style="text-align: initial;"
                        :column="2">

                        <a-descriptions-item label="UserName">
                            {{ data.username }}
                        </a-descriptions-item>

                        <a-descriptions-item label="FullName">
                            {{ data.firstname + ' ' + data.surename }}
                        </a-descriptions-item>

                        <a-descriptions-item label="Email">
                            {{ data.email }}
                        </a-descriptions-item>

                        <a-descriptions-item label="Telephone">
                            {{ data.phone }}
                        </a-descriptions-item>

                        <a-descriptions-item label="Sex">
                            {{ data.sex }}
                        </a-descriptions-item>

                        <a-descriptions-item label="Birthday">
                            {{ date(data.birthday) }}
                        </a-descriptions-item>                        

                    </a-descriptions>
                    <hr class="gradient-line">

                    <a-descriptions 
                        title="Roles" 
                        style="text-align: initial;"
                        :column="1">

                        <a-descriptions-item >
                            {{ role(data.role) }}
                        </a-descriptions-item>
                    </a-descriptions>
                    <hr class="gradient-line">

                    <a-button v-if="isDone" type="primary" @click="createNewUser">
                        Go to Create User again!
                    </a-button>
                </a-col>
            </a-row>

        </a-result>
    </div>
</template>

<script>
import moment from 'moment';
export default {
    props: {
        isDone: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: () => {}
        },
    },
    computed:{
        status(){
            return (this.isDone) ? 'success' : 'warning';
        }, 
        title(){
            return (this.isDone) ? 'Submit form succesfully' : 'Confirmation of submission';
        }
    },
    data(){
        return {
        }
    },
    methods: {
        date(day) {
            return moment(day).format("MMM Do YY");
        },
        image(item){            
            return (typeof item == 'object') ? this.$models.url(item.url) : '';
        },
        role(item){
            let data = [];
            item.forEach(element => {
                data.push(element.name);
            });
            return data.join(', ');
        },
        createNewUser(){
            this.$emit('reload');
        }
    },
}
</script>

<style scoped>
.ant-descriptions .ant-descriptions-title{
    text-align: left;
    float: left;
}
.desc p {
  margin-bottom: 1em;
}
</style>