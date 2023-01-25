const buildUser =(userObj)=>{
    const {_id,__v,password,...data}=userObj;
    data.userId=_id;
    return data
}

const commonReponse =(msg,data,field='data',others={}, op=true)=>{
    const response ={
        success:op,
        msg,
        [field]:data,
        ...others,
    }
    return response;
}
 
module.exports ={
    buildUser,
    commonReponse,
}