const checkCamera = (async() => {
    try{
        if(await navigator.mediaDevices.getUserMedia({video: true})){
            return 'camera detected'
        }
    }catch(err){
        console.log("err", err)
        return "err"
    }
  
})

export default checkCamera;