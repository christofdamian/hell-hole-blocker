// Function to create the replacement element
function createHellHole(originalElement, isBlock = false) {
    const span = document.createElement('span');
    span.className = 'twitter-hellhole-placeholder';
    span.textContent = 'HELL HOLE AVOIDED';
    span.title = originalElement.href || 'Twitter/X Embed';
    
    if (isBlock) {
        span.classList.add('block-replacement');
    }
    
    return span;
}

// Function to process a single node
function processNode(node) {
    // Check if node is an element
    if (node.nodeType !== Node.ELEMENT_NODE) return;

    // Handle <a> tags
    if (node.tagName === 'A') {
        checkAndReplaceLink(node);
    } 
    // Handle iframes (embeds)
    else if (node.tagName === 'IFRAME') {
        checkAndReplaceIframe(node);
    }
    // Handle blockquotes (twitter embed scripts often transform these)
    else if (node.tagName === 'BLOCKQUOTE' && node.classList.contains('twitter-tweet')) {
        replaceElement(node, true);
    }
    
    // Check children
    const links = node.querySelectorAll('a[href*="twitter.com"], a[href*="x.com"]');
    links.forEach(checkAndReplaceLink);

    const iframes = node.querySelectorAll('iframe[src*="platform.twitter.com"]');
    iframes.forEach(checkAndReplaceIframe);

    const tweets = node.querySelectorAll('blockquote.twitter-tweet');
    tweets.forEach(el => replaceElement(el, true));
}

function isTwitterUrl(url) {
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname;
        return hostname === 'twitter.com' || 
               hostname.endsWith('.twitter.com') || 
               hostname === 'x.com' || 
               hostname.endsWith('.x.com');
    } catch (e) {
        return false;
    }
}

function replaceElement(element, isBlock) {
    if (element.dataset.hellholeProcessed) return;
    
    const replacement = createHellHole(element, isBlock);
    element.parentNode.replaceChild(replacement, element);
    replacement.dataset.hellholeProcessed = 'true';
}

function checkAndReplaceLink(link) {
    if (isTwitterUrl(link.href)) {
        replaceElement(link, false);
    }
}

function checkAndReplaceIframe(iframe) {
    if (iframe.src && isTwitterUrl(iframe.src)) {
        replaceElement(iframe, true);
    }
}

// Initial scan
processNode(document.body);

// Observer for dynamic content
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            processNode(node);
        });
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { isTwitterUrl };
}
