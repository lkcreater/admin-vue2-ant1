import moment from "moment";

const local = {
    keyRemember: 'logapp:web-remember-application',
    keyAuthen: `logapp:key@${btoa('web-auth-application-')}`
}

local.setupAuthen = (username, token) => {
    localStorage.setItem( local.keyAuthen, btoa(JSON.stringify({
        username: username,
        timestamp: moment().unix(),
        token: token
    })))
}

local.getLocalStorageDB = () => {
    let data = {};
    if(localStorage.getItem( local.keyAuthen )){        
        data = JSON.parse(atob( localStorage.getItem( local.keyAuthen ) ));
    }

    return {
        username: data.username ?? null,
        timestamp: data.timestamp ?? null,
        token: data.token ?? false,
    }
}

local.setSyncToken = (token) => {
    if(localStorage.getItem( local.keyAuthen )){        
        let data = JSON.parse(atob( localStorage.getItem( local.keyAuthen ) ));
        data.token = token;
        data.timestamp = moment().unix();

        localStorage.setItem(local.keyAuthen, btoa(JSON.stringify(data)))
        return data;
    }
}

local.clear = () => {
    try {
        if(localStorage.getItem(local.keyAuthen)){        
            localStorage.removeItem(local.keyAuthen);
        }
        return true;
    } catch (error) {
        throw error;
    }    
}

local.setupRemember = (username) => {
    localStorage.setItem( local.keyRemember, btoa(JSON.stringify({
        username: username,
        valueOf: moment().unix()
    })))	
}

local.removeRemember = () => {
    if(localStorage.getItem(local.keyRemember)){
        localStorage.removeItem(local.keyRemember);
    }
}

local.loadRemember = () => {
    let items = {};
    if(localStorage.getItem(local.keyRemember)){
        items = JSON.parse(atob( localStorage.getItem(local.keyRemember) ));
    }
    return {
        username: items?.username || '',
        rememberMe: (items.username) ? true : false,
    }
}

export default local;