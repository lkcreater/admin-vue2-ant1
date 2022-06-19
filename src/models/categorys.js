import axios from "axios";

const model = function(){
    return {
        create: async function(){
            let url = 'http://echo.jsontest.com/key/value/one/two';
            await axios.get(url)
                .then((res) => {
                    console.log('success ' + arg, res);
                })
                .catch((err) => {
                    console.log('err', err);
                }).then((x) => {
                    console.log('x', x);
                });
            console.log('out app');
            return 'leky';
        }
    }
};


export default model;