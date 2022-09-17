.<template>
    <a-drawer
        :title="title"
        :width="550"
        :visible="visibleDrawerForm"
        :body-style="{ paddingBottom: '80px' }"
        :maskClosable="false"
        :closable="false" >

        <FormInput
            ref="editFormInput"   
            @success="handleSuccessForm"         
            @cancel="handleCancelForm">
        </FormInput>       

    </a-drawer>
</template>

<script>
import FormInput from '@/components/Categorys/FormInput';

export default {
    components: {
        FormInput,
    },
    computed: {
        title() {
            return (this.isUpdateForm) ? 'Edit category' : 'Add new category'
        }
    },
    data() {
        return {
            modelInput: {},
            visibleDrawerForm: false,
            isUpdateForm: false,
        }
    },
    methods: {
        openForm(item){              
            if(item){   
                // wait element create       
                let fnLoadForm =  setInterval(() => {
                    if(this.$refs['editFormInput']){
                        //setup form input
                        this.$refs['editFormInput'].onEditInput(item);  
                        // clear timeout                  
                        clearInterval(fnLoadForm);
                    }
                }, 100); 

                // is update form true
                this.isUpdateForm = true; 
            }else{
                // is update form false
                this.isUpdateForm = false; 
            }

            this.visibleDrawerForm = true;         
        },
        handleCancelForm(){
            this.visibleDrawerForm = false;  
        },
        handleSuccessForm(){
            this.visibleDrawerForm = false;  
            this.$emit('success');
        },    
       
        onPassCreateSuccess(result){
            this.$emit('create-success', result);
        },
        onPassUpdateSuccess(result){
            this.$emit('update-success', result);
        }
    },
}
</script>

