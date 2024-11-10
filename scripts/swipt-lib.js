load_lib1();

function load_lib1() {
    let xhhtp = new XMLHttpRequest();
    xhhtp.onload = function(){
        document.getElementById("background-1").innerHTML =
            this.responseText;
    }
    xhhtp.open("GET", "../pages/library-page-1.html");
    xhhtp.send();
}

function load_lib2() {
    let xhhtp = new XMLHttpRequest();
    xhhtp.onload = function(){
        document.getElementById("background-1").innerHTML =
            this.responseText;
    }
    xhhtp.open("GET", "../pages/library-page-2.html");
    xhhtp.send();
}

function load_lib3() {
    let xhhtp = new XMLHttpRequest();
    xhhtp.onload = function(){
        document.getElementById("background-1").innerHTML =
            this.responseText;
    }
    xhhtp.open("GET", "../pages/library-page-3.html");
    xhhtp.send();
}

