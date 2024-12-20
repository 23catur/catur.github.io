/* 
Project Name: Modern Portfolio Website
Description: A complete responsive modern portfolio website design
             by using HTML CSS and Vanilla JavaScript from scratch.
Author: Md Al Amin Hossen
Github: https://github.com/MdRasen
License: MIT License
Copyright: 2023 ©MdRasen 
*/

// Typing animation
var typed = new Typed(".typing", {
    strings: [
        "",
        "Web",
        "Web Designer",
        "Web Developer",
        "Graphic Designer",
        "Android Developer",
    ],
    typeSpeed: 100,
    BackSpeed: 60,
    loop: true,
});

// Aside
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function() {
        for (let k = 0; k < totalSection; k++) {
            allSection[k].classList.remove("back-section");
        }
        //Loop for removing active class
        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector("a").classList.contains("active")) {
                allSection[j].classList.add("back-section");
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        //Adding active class
        this.classList.add("active");
        showSection(this); //Function call
        //Nav click event - Hiding the nav menu
        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    });
}

function showSection(element) {
    //Loop for removing active class
    for (let k = 0; k < totalSection; k++) {
        allSection[k].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active");
}

//For Hire me section
document.querySelector(".hire-me").addEventListener("click", function() {
    showSection(this);
    updateNav(this);
});

function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (
            target ===
            navList[i].querySelector("a").getAttribute("href").split("#")[1]
        ) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

//For Nav Toggler Button
const navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".aside");
navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
});

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
}

function openModal(img) {
    var modal = document.getElementById("modal");
    var modalImg = document.getElementById("modalImage");
    modal.style.display = "flex"; // Menggunakan flex agar modal full screen
    modalImg.src = img.src;
}

function closeModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}

if (window.location.pathname === '/index.html') {
    window.location.pathname = '/';
}

document.addEventListener("DOMContentLoaded", function() {
    const filterButtons = document.querySelectorAll(".filter-btn"); // Tombol filter
    const blogItems = document.querySelectorAll(".blog-item"); // Elemen portfolio item

    filterButtons.forEach((button) => {
        button.addEventListener("click", function() {
            // Hilangkan class active dari semua tombol
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            this.classList.add("active"); // Tambahkan class active ke tombol yang diklik

            const filter = this.getAttribute("data-filter"); // Ambil nilai data-filter

            blogItems.forEach((item) => {
                // Tampilkan elemen jika sesuai filter, sembunyikan jika tidak
                if (filter === "all" || item.getAttribute("data-category") === filter) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah reload halaman

    const form = event.target;
    const formData = new FormData(form);

    fetch(form.action, {
            method: form.method,
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: data.message
                });
                form.reset(); // Reset form jika berhasil
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message
                });
            }
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An unexpected error occurred.'
            });
        });
});