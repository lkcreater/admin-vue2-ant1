<template>
    <div>
        <!-- Authors Table -->
		<a-row :gutter="24" type="flex">

			<!-- Authors Table Column -->
			<a-col :span="24" class="mb-24">

				<div class="card-container">
					<a-tabs 
						class="tab-custom-setting"
						type="card" 
						tab-position="left">

						<a-tab-pane key="1" >
							<template slot="tab">
								<a-icon type="team" />
								<div>USERS TABLE</div>		
							</template>
							<!-- Authors Table Card -->
							<CardUsersList></CardUsersList>
							<!-- / Authors Table Card -->
						</a-tab-pane>

						<a-tab-pane key="2" >
							<template slot="tab">
								<a-icon type="solution" />
								<div>USER ROLES</div>		
							</template>

							<FormRoles></FormRoles>
						</a-tab-pane>

						<a-tab-pane key="3" >
							<template slot="tab">
								<a-icon type="user-add" />
								<div>CREATE USER</div>		
							</template>

							<StepCreateUser :key="keyComponent" ref="StepCreateUser" @reload="reload"></StepCreateUser>
						</a-tab-pane>

					</a-tabs>
				</div>				

			</a-col>
			<!-- / Authors Table Column -->

		</a-row>
		<!-- / Authors Table -->
    </div>
</template>

<script>
import CardUsersList from '@/components/Users/CardUsersList' ;
import StepCreateUser from '@/components/Step/StepCreateUser';
import FormRoles from '@/components/Users/FormRoles';
    
export default {
    components: {
		CardUsersList,
		StepCreateUser,
		FormRoles
	},
	data() {
		return {
			keyComponent: 0
		}
	},
	methods: {
		reload(){
			this.keyComponent++
		}
	},
}
</script>