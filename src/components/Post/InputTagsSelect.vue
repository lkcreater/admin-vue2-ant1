<template>
    <div class="lk-input-tags tags-field">
        <a-form-model-item :colon="false" :label="label">
            <a-select 
                size="small" 
                mode="tags" 
                :placeholder="placeholder"
                style="width: 100%"  
                @change="handleChange">

                <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
                    {{ (i + 9).toString(36) + i }}
                </a-select-option>

            </a-select>
        </a-form-model-item>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: 'Tags'
        },
        placeholder: {
            type: String,
            default: 'Tags Mode'
        },
    },
    methods: {
        handleChange(value) {
            console.log(`selected ${value}`);
        },
    },
}
</script>