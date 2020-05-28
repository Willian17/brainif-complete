<template>
   <div class="info">
        <b-avatar></b-avatar>
        <div class="user-info">
            <strong>{{main}} </strong>
            <span>{{sub}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'userInfo',
    props: ['main' , 'sub']
}
</script>

<style>
    .info{
         display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    .info .user-info{
        margin-left: 10px;
    }
    .user-info strong{
        display: block;
        font-size: 16px;
        color: #333;
    }
     .user-info span{
        font-size: 13px;
        color: #999;
        margin-top: 2px;
    }
</style>