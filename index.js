'use strict';

let Trail =function(options) {
    this.size = options.size || 50;
    this.lengthTrail = options.trailLength || 20;
    this.interval = options.interval || 15;
    this.hueSpeed = options.hueSpeed || 5;

    this.boxes = [];
    this.hue = 0;
    this.mouse = {
        x: window.innerWidth/2,
        y: window.innerHeight/2
    };

    this.init = () => {
        for(let i=0;i<this.lengthTrail;i++) {
            this.boxes[i] = document.createElement('div');
            this.boxes[i].className = 'box';
            this.boxes[i].style.width = this.size + 'px';
            this.boxes[i].style.height = this.size + 'px';
            document.body.appendChild(this.boxes[i]);

        }
    }
    
    setInterval(() => {
        this.updateCursor();
        this.updateColor();
    },this.interval);

    this.updateColor = function() {
        this.hue = (this.hue + this.hueSpeed) % 360;
    }

    this.updateCursor = function() {
        for(let i=0;i<this.boxes.length;i++) {
            if(i+1 === this.boxes.length) {
                this.boxes[i].style.top = this.mouse.y - this.size/2 + 'px';
                this.boxes[i].style.left = this.mouse.x - this.size/2 + 'px';
                this.boxes[i].style.backgroundColor = 'hsl(' + this.hue + ',90%, 50%)';
            } else {
                this.boxes[i].style.top = this.boxes[i+1].style.top;
                this.boxes[i].style.left = this.boxes[i+1].style.left
                this.boxes[i].style.backgroundColor = this.boxes[i+1].style.backgroundColor
            }

        }
    }
}

let options = {
    trailLength: 30,
    size: 50,
    interval: 10,
    hueSpeed: 2
};
let newtrail = new Trail(options);
newtrail.init();
//Hotfix
document.onmousemove = function() {
    newtrail.mouse.x = event.clientX;
    newtrail.mouse.y = event.clientY;
  };