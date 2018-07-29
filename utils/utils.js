
var createMessage= (from, text) => {

    if(typeof from== "string") {
        return {
            from,
            text,
            createdAt: new Date().toLocaleTimeString()
        };
    }
    else if(typeof from== "object") {
        if(from.from) {
            if(from.text && from.text.length>0) {
                return {
                    from: from.from,
                    text: from.text,
                    createdAt: new Date().toLocaleTimeString()
                };
            }
            else {
                return {
                    from: from.from,
                    text: "No message was sent...",
                    createdAt: new Date().toLocaleTimeString()
                };
            }
        }
        else {
            return {
                from: "none",
                text: "no text inserted",
                createdAt: new Date().toLocaleTimeString()
            };
        }
    }
    else {
        return {
            from: "From value was NOT OK...",
            text: "no text inserted...",
            createdAt: new Date().toLocaleTimeString()
        };
    }
}

module.exports= {
    createMessage
};