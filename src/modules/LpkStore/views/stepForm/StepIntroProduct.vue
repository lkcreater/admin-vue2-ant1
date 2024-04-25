<template>
    <div>
        <h5>{{ label.title }}</h5>
        <a-form-model
            class="lk-form-custom"
            ref="formRules"
            :model="form"
            :rules="rules">

            <a-row>
                <a-col class="lk-col-left" span="14">                            
                    <a-form-model-item :colon="false" label="Title" prop="title">
                        <a-input size="small" v-model="form.title" placeholder="please enter title" />
                    </a-form-model-item >
                </a-col>
            </a-row>

        </a-form-model>
    </div>
</template>

<script>
const initForm = function() {
    return {
        image: '',
        title: '',
        slug: '',    
        categorys: []
    }
}

export default {
    computed: {
        label() {
            return {
                title: 'รายละเอียดสินค้า'
            }
        }
    },
    data() {
        return {
            form: initForm(),
            rules: {
                title: [
                    { required: true, trigger: 'blur' },
                ],
                image: [
                    { required: true, trigger: 'blur' },
                ],
            }
        }
    },
}
</script>

<style lang="scss" scoped>

</style>