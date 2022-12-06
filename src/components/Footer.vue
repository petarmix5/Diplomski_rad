<template>
    <div class="container-fluid">
    <footer id="footer" class="row">
    <div class="footerlogo col-lg-4 col-xs-12">
                <img :src="footerLogo" alt="footerlogo" >
                </div>
                <div class="copyright col-lg-4 col-xs-12">

                    <p>{{copy}}</p>
                </div>

               
    <div class="socialmedia col-lg-4 col-xs-12 d-flex">
        <a href="#" class="facebook"><img :src="smFacebook" alt="facebook"></a>
        <a href="#" class="instagram"><img :src="smInstagram" alt="instagram"></a>
        <a href="#" class="github"><img :src="smGithub" alt="github"></a>
    </div> 

    </footer>
</div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup(){
        const copy = ref('Copyright © 2022 | Sva prava pridržana | Petar Mikić')
        const footerLogo = ref(require('@/assets/PoljoAppLogo.png'))

        const smFacebook = ref(require('@/assets/fb1.png'))
        const smInstagram = ref(require('@/assets/ig1.png'))
        const smGithub = ref(require('@/assets/git1.png'))

        return {copy, footerLogo, smFacebook, smInstagram, smGithub}
    }

}
</script>

<style scoped>
footer.row{
    background: #013a51;
    display:flex;
    align-items: baseline;
    padding:20px 0 20px 0;
    position:absolute;
    width:100%;
    height:auto;

}
.copyright{
    text-align: center;
}
footer p{
    color:#fff;
}
footer .socialmedia{
    justify-content:end;
}
footer .socialmedia img:hover{
    transform:scale(1.1);
}
footer .socialmedia img{
    margin-left: 20px;
}

@media(max-width: 991px){
    footer .footerlogo img{
        width:20%;
    }
    .footerlogo{
        text-align: center;
    }

    footer .copyright, .footerlogo{
        margin-bottom: 10px;
    }
    footer .socialmedia img{
        width:60%;
    }
    footer .socialmedia{
        justify-content: center;
    }

}



</style>