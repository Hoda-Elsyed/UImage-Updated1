const femaleBtn = document.querySelector(".female");
const maleBtn = document.querySelector(".male");
// const dropDowns = document.querySelectorAll(".angle-down");
// const toolTips = document.querySelectorAll(".tooltip");
const copyArrow = document.getElementById("copy_arrow");
const downloadArrow = document.getElementById("download_arrow");
const copySelected = document.getElementById("copy_selected");
const downloadSelected = document.getElementById("download_selected");
// const lists = document.querySelectorAll(".sizes");
const copyImageList = document.querySelector("#copy_image");
const downloadImageList = document.querySelector("#download_image");
const copyImageSizes = document.querySelectorAll("#copy_image li");
const downloadImageSizes = document.querySelectorAll("#download_image li");
const copyValue = document.querySelector("#copy_value span");
const downloadValue = document.querySelector("#download_value span");
const toggleBtns = document.querySelectorAll(".toggle-me span");
const canvas = document.querySelector(".image-wrapper");
const colorInput = document.querySelector('input[type="color"]');
const coloredCircles = document.querySelectorAll(".colored");
const circles = document.querySelectorAll(".circle");
const transparent = document.getElementById("transparent");
const toastMessage = document.querySelector(".toastMessage");
const shuffle = document.querySelector(".shuffle");
const ctx = canvas.getContext("2d");

let gender = "male-1";
let background = "#870aec";
let image;
let imag;
let newCanvas = document.createElement("canvas");
let ctx2 = newCanvas.getContext("2d");


function toggleGender() {
  if (maleBtn.classList.contains("active")) {
    maleBtn.classList.remove('active')
    femaleBtn.classList.add('active')
    gender = 'female'
    generateImage()
  } else {
    maleBtn.classList.add('active')
    femaleBtn.classList.remove('active')
    gender = 'male-1'
    generateImage()
  }
}

generateImage();
function generateImage() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  image = new Image();
  image.src = `images/${gender}.png`;
  console.log(image.src);
  image.addEventListener("load", () => {
    ctx.drawImage(image, 0, 30, canvas.width, 340);
  });
}

function generateImage2Copy(dimension) {
  newCanvas.height = dimension;
  newCanvas.width = dimension;
  ctx2.clearRect(0, 0, canvas.width, canvas.height);
  ctx2.fillStyle = background;
  ctx2.fillRect(0, 0, dimension, dimension);

  let imag = new Image();
  imag.src = `images/${gender}.png`;
  imag.width = newCanvas.width;
  imag.height = newCanvas.height;
  imag.addEventListener("load", () => {
    ctx2.drawImage(imag, 0, 0, dimension, dimension);
  });
  setTimeout(() => {
    copyToClipboard();
  }, 1000);
}
function generateImage2Download(dimension) {
  newCanvas.height = dimension;
  newCanvas.width = dimension;
  ctx2.clearRect(0, 0, canvas.width, canvas.height);
  ctx2.fillStyle = background;
  ctx2.fillRect(0, 0, dimension, dimension);

  let imag = new Image();
  imag.src = `images/${gender}.png`;
  imag.width = newCanvas.width;
  imag.height = newCanvas.height;
  // console.log(newCanvas.width, newCanvas.height, imag.width, imag.height);
  imag.addEventListener("load", () => {
    ctx2.drawImage(imag, 0, 0, dimension, dimension);
  });
  setTimeout(() => {
    dowloadImage();
  }, 1000);
}
// generateImage2();
maleBtn.addEventListener("click", () => {
   gender = "male-1";
  generateImage();
  toggleGender();
});
femaleBtn.addEventListener("click", () => {
   gender = "female-1";
 generateImage();
 toggleGender();
  // generateImage2();
});

shuffle.addEventListener("click", () => {
  if (maleBtn.classList.contains("active")) {
    gender = "male" + Math.floor(Math.random() * 6);
    generateImage()
  } else {
    gender = "female" + Math.floor(Math.random() * 3);
    generateImage()
  }
});

circles.forEach((one, idx) => {
  one.addEventListener("click", () => {
    // remove picked class from all ones
    circles.forEach((one) => {
      one.classList.remove("picked");
    });
    // add picked class to clicked circle
    circles[idx].classList.add("picked");
  });
});

coloredCircles.forEach((circle, idx) => {
  circle.addEventListener("click", () => {
    background = coloredCircles[idx].style.backgroundColor;
    generateImage();
    // generateImage2();
  });
});

colorInput.addEventListener("input", () => {
  background = colorInput.value;
  generateImage();
  // generateImage2();
});

transparent.addEventListener("click", () => {
  background = "transparent";
  generateImage();
  // generateImage2()
});


copyArrow.addEventListener("click", () => {
  downloadArrow.classList.remove("active");
  copyArrow.classList.toggle("active");
  downloadImageList.classList.remove("displayed");
  copyImageList.classList.toggle("displayed");
  copyArrow.parentElement.classList.add("nohover");
});

downloadArrow.addEventListener("click", () => {
  copyArrow.classList.remove("active");
  downloadArrow.classList.toggle("active");
  copyImageList.classList.remove("displayed");
  downloadImageList.classList.toggle("displayed");
  downloadArrow.parentElement.classList.add("nohover");
});

document.body.addEventListener("click", (e) => {
  if (!copyImageList.contains(e.target) && !copyArrow.contains(e.target)) {
    copyImageList.classList.remove("displayed");
    copyArrow.classList.remove("active");
    copyArrow.parentElement.classList.remove("nohover");
  }
  if (
    !downloadImageList.contains(e.target) &&
    !downloadArrow.contains(e.target)
  ) {
    downloadImageList.classList.remove("displayed");
    downloadArrow.classList.remove("active");
    downloadArrow.parentElement.classList.remove("nohover");
  }
});


copyImageSizes.forEach((size) => {
  size.addEventListener("click", () => {
    copyImageSizes.forEach((size) => {
      size.classList.remove("highlight");
    });
    size.classList.add("highlight");
    let value = size.firstChild.innerHTML;

    copyValue.textContent = value;
    // newCanvas.width = value;
    // newCanvas.height = value;
  });
});

downloadImageSizes.forEach((dsize) => {
  dsize.addEventListener("click", () => {
    downloadImageSizes.forEach((dsize) => {
      dsize.classList.remove("highlight");
    });
    dsize.classList.add("highlight");
    let dvalue = dsize.firstChild.innerHTML;

    downloadValue.textContent = dvalue;
  });
});

copySelected.addEventListener("click", () => {
  copySelected.classList.add("active");
  toastMessage.classList.add("show");
  generateImage2Copy(copyValue.textContent);
  setTimeout(() => {
    toastMessage.classList.remove("show");
    copySelected.classList.remove("active");
    // copySelected.classList.toggle("nohover");
  }, 2000);
});
downloadSelected.addEventListener("click", () => {
  downloadSelected.classList.add("active");
  generateImage2Download(downloadValue.textContent);

  setTimeout(() => {
    toastMessage.classList.remove("show");
    downloadSelected.classList.remove("active");
    // copySelected.classList.toggle("nohover");
  }, 2000);
});

function copyToClipboard() {
  newCanvas.toBlob(function (blob) {
    navigator.clipboard
      .write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ])

      .then(() => console.log("Image copied to clipboard"))
      .catch((err) => console.error("Could not copy image to clipboard", err));
  });
}

function dowloadImage() {
  const imageLink = document.createElement("a");
  document.body.appendChild(imageLink);
  imageLink.href = newCanvas.toDataURL("image.png", 1);
  imageLink.download = "image.png";
  imageLink.click();
}
