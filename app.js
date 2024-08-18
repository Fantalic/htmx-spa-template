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

const router = {
    data: function(req, res) {
        res.innerHTML = '<p>This is some dynamically loaded content!</p>';
    },
    moreData: function(req, res) {
        res.innerHTML = '<p>This is more dynamically loaded content!</p>';
    },
};

document.body.addEventListener('htmx:beforeRequest', fakeRequest)