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
							<CardAuthorTable
								:data="table1Data"
								:columns="table1Columns"
							></CardAuthorTable>
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

							<step-create-user></step-create-user>
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
import CardAuthorTable from '@/components/Cards/CardAuthorTable' ;
import StepCreateUser from '@/components/Step/StepCreateUser';
import FormRoles from '@/components/Forms/FormRoles';


const table1Columns = [
		{
			title: 'AUTHOR',
			dataIndex: 'author',
			scopedSlots: { customRender: 'author' },
		},
		{
			title: 'FUNCTION',
			dataIndex: 'func',
			scopedSlots: { customRender: 'func' },
		},
		{
			title: 'STATUS',
			dataIndex: 'status',
			scopedSlots: { customRender: 'status' },
		},
		{
			title: 'EMPLOYED',
			dataIndex: 'employed',
			class: 'text-muted',
		},
		{
			title: '',
			scopedSlots: { customRender: 'editBtn' },
			width: 50,
		},
	];

const table1Data = [
		{
			key: '1',
			author: {
				avatar: 'images/face-2.jpg',
				name: 'Michael John',
				email: 'michael@mail.com',
			},
			func: {
				job: 'Manager',
				department: 'Organization',
			},
			status: 1,
			employed: '23/04/18',
		},
		{
			key: '2',
			author: {
				avatar: 'images/face-3.jpg',
				name: 'Alexa Liras',
				email: 'alexa@mail.com',
			},
			func: {
				job: 'Programator',
				department: 'Developer',
			},
			status: 0,
			employed: '23/12/20',
		},
		{
			key: '3',
			author: {
				avatar: 'images/face-1.jpg',
				name: 'Laure Perrier',
				email: 'laure@mail.com',
			},
			func: {
				job: 'Executive',
				department: 'Projects',
			},
			status: 1,
			employed: '13/04/19',
		},
		{
			key: '4',
			author: {
				avatar: 'images/face-4.jpg',
				name: 'Miriam Eric',
				email: 'miriam@mail.com',
			},
			func: {
				job: 'Marketing',
				department: 'Organization',
			},
			status: 1,
			employed: '03/04/21',
		},
		{
			key: '5',
			author: {
				avatar: 'images/face-5.jpeg',
				name: 'Richard Gran',
				email: 'richard@mail.com',
			},
			func: {
				job: 'Manager',
				department: 'Organization',
			},
			status: 0,
			employed: '23/03/20',
		},
		{
			key: '6',
			author: {
				avatar: 'images/face-6.jpeg',
				name: 'John Levi',
				email: 'john@mail.com',
			},
			func: {
				job: 'Tester',
				department: 'Developer',
			},
			status: 0,
			employed: '14/04/17',
		},
	];
    
export default {
    components: {
		CardAuthorTable,
		StepCreateUser,
		FormRoles
	},
	data() {
		return {
			// Associating "Authors" table data with its corresponding property.
			table1Data: table1Data,
			// Associating "Authors" table columns with its corresponding property.
			table1Columns: table1Columns,
		}
	},
	methods: {
	},
}
</script>

<style>

</style>