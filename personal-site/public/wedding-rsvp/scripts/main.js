let imgTitles = ["cliff", "van", "vanshadow", "sun", "horizon", "sea"];

// Inject image element into relative container
const addImage = (title) => {
    const img = new Image();
    const imgContainer = document.getElementById("landscape-" + title + "-container");
    img.onload = function() { areWeAllHere(title) }
    img.src = "./images/" + title + ".svg";
    img.classList.add("landscape-" + title);
    imgContainer.appendChild(img);
}

// Check if all images above the fold have loaded
const areWeAllHere = (loadedTitle) => {
    imgTitles = imgTitles.filter(title => title !== loadedTitle);
    if (imgTitles.length) {
        return;
    }
    startAnimation();
}

// Start initial animation after all ATF images are loaded
const startAnimation = () => {
    document.body.classList.remove("landscape-loading");
    if (window.scrollY === 0) {
        document.body.classList.add("landscape-animate");
    } else {
        document.body.classList.add("landscape-instant");
    }
}

// Simultaneous navigate and close nav
const goToSection = (e) => {
    e.preventDefault();
    const sectionName = e.target.hash.substring(1);
    const yPos = document.getElementById(sectionName).getBoundingClientRect().top + window.scrollY;
    console.log('y position ' + yPos);
    window.scrollTo({
        top: yPos,
        behavior: "smooth"
    });
    document.getElementById('nav-toggle').checked = false;
}
const links = [];
links.push(document.querySelectorAll('a[href="#section-when"]'));
links.push(document.querySelectorAll('a[href="#section-info"]'));
links.push(document.querySelectorAll('a[href="#section-lodging"]'));
links.push(document.querySelectorAll('a[href="#section-rsvp"]'));
links.forEach(linkGroup => {
    linkGroup.forEach(link => {
        link.addEventListener('touchend', goToSection);
        link.addEventListener('click', goToSection);
    })
})

// Copy address functionality
const copyBtn = document.getElementById("address-copy-btn");

copyBtn.addEventListener('click', function() {
    copyBtn.classList.add('address-copied');
    setTimeout(() => {
        copyBtn.classList.remove('address-copied');
    }, 3000);
});

// Change site state on scroll down/up
const rsvpBtn = document.getElementById('cta-rsvp');
function checkTopOffset() { 
    if (window.scrollY === 0) {
        removeHash();
        rsvpBtn?.classList.remove('cta-hide');
    } else {
        rsvpBtn?.classList.add('cta-hide');
    }
} 
window.addEventListener('scroll', checkTopOffset); 
function removeHash () { 
    history.pushState("", document.title, window.location.pathname
                                                       + window.location.search);
}


(() => {
    imgTitles.forEach(title => addImage(title));
})();