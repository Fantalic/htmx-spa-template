// const htmx = require('https://unpkg.com/htmx.org@2.0.1');

console.log("HTMX")
console.log(htmx)

function fakeRequest(event) {
    const hxGetValue = event.detail.elt.getAttribute('hx-get');
    if (!router[hxGetValue]) 
        console.warn(`Route ${hxGetValue} is not defined.`);

    // Get the target element for content replacement
    const target = event.detail.target;
    // Call the loadData function
    const req = {
        target
    }
    const res = {
        innerHTML: ''
    }

    // Call the appropriate function based on the hx-get value
    router[hxGetValue](req, res);
    
    event.preventDefault();
    
    htmx.swap(
        target, 
        res.innerHTML,
        { swapStyle: 'innerHTML' }
    );
}

document.body.addEventListener('htmx:afterRequest', function(event) {
    console.log("TEST AFTER REQUEST")
    console.log(event)
});

// Listen for the htmx:configRequest event
// document.body.addEventListener('htmx:configRequest', 
// document.querySelector('[hx-get]').addEventListener('htmx:beforeRequest', fakeResponseEvent);
document.body.addEventListener('htmx:beforeRequest', fakeRequest)

const router = {
    data: function(req, res) {
        res.innerHTML = '<p>This is some dynamically loaded content!</p>';
    },
    moreData: function(req, res) {
        res.innerHTML = '<p>This is more dynamically loaded content!</p>';
    },
};

// // Define the /data endpoint
// app.get('/data', (req, res) => {
//     res.send('<p>This is some dynamically loaded content!</p>');
// });