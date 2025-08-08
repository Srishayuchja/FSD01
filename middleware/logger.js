module.exports = (req,res,next) => {
   
//console.log (req.path + 'inside middleware')
//req.path = '/raj/mahan'
token ='cbchgcvghcjnvhvm mv '
req.userName = 'john'

const bool = true
if (bool){
    next()
}else{
    res.send('Done')
}

}

