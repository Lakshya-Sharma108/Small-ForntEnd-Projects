const frameCount = 110; // change to your frame count

const canvas = document.getElementById("heroCanvas");
const context = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

const images = [];
let currentFrame = 0;
let scrollLocked = true;

// preload images
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = `Images/frame_${String(i).padStart(4, '0')}.webp`; // or webp
  images.push(img);
}

images[0].onload = () => {
  context.drawImage(images[0],0,0,canvas.width,canvas.height);
};

function renderFrame(index){
  const img = images[index];
  if(!img) return;

  context.clearRect(0,0,canvas.width,canvas.height);
  context.drawImage(img,0,0,canvas.width,canvas.height);
}

// SCROLL CONTROL
window.addEventListener("wheel",(e)=>{

  if(scrollLocked){
    e.preventDefault();
  }

  if(e.deltaY > 0){
    currentFrame += 2;
  }else{
    currentFrame -= 2;
  }

  currentFrame = Math.max(0, Math.min(frameCount-1,currentFrame));
  renderFrame(currentFrame);

  // unlock when reaches end
  if(currentFrame >= frameCount-1){
    scrollLocked = false;
    document.body.style.overflow = "auto";
    document.getElementById("mainContent").style.opacity = 1;
  }

  // lock again if user scrolls back to top
  if(window.scrollY <= 5 && currentFrame < frameCount-5){
    scrollLocked = true;
    document.body.style.overflow = "hidden";
  }

},{passive:false});
