

let imgElement = document.getElementById('imageFile'); //get image container
let inputElement = document.getElementById('inputFile'); // get file input

inputElement.addEventListener('change', (e) => { 
  imgElement.src = URL.createObjectURL(e.target.files[0]); //set image blob
}, false);

imgElement.onload = function() {
    $("#figure-container").show();
    $("#filter-container").show()
};

$("#select-filter").on('change', function() { //on user select filter
    let filter_id = parseInt($(this).val());
    switch(filter_id){
        case 1:
            generateBWFilter() //black and white filter
            break;
        case 2:
            generateBlurFilter() //gaussian blur filter
            break;
        case 3: 
            generateSolarizedFilter() //solarized filter 
            break;
        case 4: 
            generateSkinDollFilter() //skin doll filter
            break;
        case 5:
            generateSkingPaintingFilter() //sking painting filter
            break;
    }
});

function generateBWFilter(){ //black and white filter
    let mat = cv.imread(imgElement);
    cv.cvtColor(mat, mat, cv.COLOR_RGB2GRAY);
    cv.imshow('canvasOutput', mat);
    mat.delete();
}

function generateBlurFilter(){ //gaussian blur filter
    let src = cv.imread(imgElement);
    let dst = new cv.Mat();
    let ksize = new cv.Size(3, 3);
    cv.GaussianBlur(src, dst, ksize, 100000000, 10000000, cv.BORDER_DEFAULT);
    cv.imshow('canvasOutput', dst);
    src.delete(); dst.delete();
}

function generateSolarizedFilter(){ //solarized filter
    let src = cv.imread(imgElement);
    let dst = new cv.Mat();
    let M = cv.Mat.eye(3, 3, cv.CV_32FC1);
    let anchor = new cv.Point(-1, -1);
    cv.filter2D(src, dst, cv.CV_8U, M, anchor, 0, cv.BORDER_DEFAULT);
    cv.imshow('canvasOutput', dst);
    src.delete(); dst.delete(); M.delete();
}

function generateSkinDollFilter(){ //skin doll filter
    let src = cv.imread(imgElement);
    let dst = new cv.Mat();
    cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0);
    cv.bilateralFilter(src, dst, 9, 75, 75, cv.BORDER_DEFAULT);
    cv.imshow('canvasOutput', dst);
    src.delete(); dst.delete();
}

function generateSkingPaintingFilter(){ //sking painting filter
    let src = cv.imread(imgElement);
    let dst = new cv.Mat();
    cv.medianBlur(src, dst, 5);
    cv.imshow('canvasOutput', dst);
    src.delete(); dst.delete();
}

function onOpenCvReady() { 
    /** impot cv is a asynchronous function
     * so we got a callback function 
     * to be ready to use
     */
  document.getElementById('status').innerHTML = 'O Open CV está pronto para processamento.';
  $("#alert-cv").removeClass('alert-warning');
  $("#alert-cv").addClass('alert-primary');
}

$(document).ready(function(){ // on document is ready
    $("#figure-container").hide();
    $("#filter-container").hide();
})