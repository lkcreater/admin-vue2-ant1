<template>
    <a-card :bordered="false" class="header-solid h-full">
        <a-row>
            <a-col :span="12"></a-col>
            <a-col :span="12"></a-col>
        </a-row>
        <hr class="gradient-line">
        <a-row>
            <a-col :span="8">
                <a-avatar 
                    class="lk-avatar-design-detail"
                    shape="square" 
                    icon="camera"
                    :src="url(item.options.image)">
                </a-avatar>
            </a-col>
            <a-col :span="16" style="padding-left: 30px; padding-top: 20px;">
                <h5>{{ item.title }}</h5>
                <div style="color: #b4b4b4;">
                    <b>Slug : </b>{{ item.slug }}<br/>
                    <b>Create At : </b>{{ date(item.created_at) }}<br/>
                    <b>Update At : </b>{{ date(item.update_at) }}<br/>
                    <b>Public At : </b>{{ date(item.public_date_at) }}<br/>
                </div>

                <div class="lk-block-gallery">
                    <div class="lk-title"><b>Gallery</b></div>
                    <a-avatar 
                        v-for="gall in item.options.gallery" 
                        :key="gall.filename" 
                        shape="square" 
                        :size="70" 
                        icon="camera" 
                        :src="url(gall)">
                    </a-avatar>
                </div>

                
            </a-col>
        </a-row>
    </a-card>
</template>

<script>
import * as Api from '@/apis/mediaApi';
import moment from 'moment';

export default {
    props: {
        item: {
            type: Object,
            default: () => {}
        },
    },
    methods: {
        url(link){
            if(link){
                return Api.getUrl(link.url);
            }
        },
        date(time){
            return moment(time).format('MMMM Do YYYY, h:mm a');
        }
    },    
}
</script>

<style>
.lk-block-gallery{
    margin-top: 15px;
}
.lk-block-gallery .lk-title {
    margin-bottom: 10px;
}
.lk-block-gallery .ant-avatar {
    margin-right: 5px;
    margin-left: 5px;
}
.lk-avatar-design-detail{
    width: 100%; 
    height: 220px;
    border-radius: 12px;
    font-size: 100px !important;
    line-height: 2;
    color: rgb(183 183 183);
    box-shadow: 0 5px 10px rgba(0,0,0,.12)!important;
    background-color: #c1c1c16b;
}
</style>