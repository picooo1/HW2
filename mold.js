class Mold {
    constructor() {
      this.x = windowWidth / 2;
      this.y = windowHeight / 2;
      this.r = 0.5;
  
      this.heading = random(360); // Random initial angle
      this.vx = cos(this.heading);
      this.vy = sin(this.heading);
      this.rotAngle = 45; // Adjust the rotation angle for smoother animation
  
      this.rSensorPos = createVector(0, 0);
      this.lSensorPos = createVector(0, 0);
      this.fSensorPos = createVector(0, 0);
      this.sensorAngle = 45;
      this.sensorDist = 10;
  
      this.colorOffset = random(TWO_PI/2); // Random initial color offset
    }
  
    update() {
      this.vx = cos(this.heading);
      this.vy = sin(this.heading);
  
      this.x = (this.x + this.vx + windowWidth) % windowWidth;
      this.y = (this.y + this.vy + windowHeight) % windowHeight;
  
      this.getSensorPos(this.rSensorPos, this.heading + this.sensorAngle);
      this.getSensorPos(this.lSensorPos, this.heading - this.sensorAngle);
      this.getSensorPos(this.fSensorPos, this.heading);
  
      let index, l, r, f;
      index = 4 * (d * floor(this.rSensorPos.y) * windowWidth + d * floor(this.rSensorPos.x));
      r = pixels[index];
      index = 4 * (d * floor(this.lSensorPos.y) * windowWidth + d * floor(this.lSensorPos.x));
      l = pixels[index];
      index = 4 * (d * floor(this.fSensorPos.y) * windowWidth + d * floor(this.fSensorPos.x));
      f = pixels[index];
  
      if (f > l && f > r) {
        this.heading += 0;
      } else if (l > f && l > r) {
        this.heading += -this.rotAngle;
      } else if (r > f && r > l) {
        this.heading += this.rotAngle;
      }
  
      // Update color offset continuously
      this.colorOffset += 0.01; // Adjust the speed of color change as needed
    }
  
    display() {
      let col = dynamicColor(this.x, this.y, this.colorOffset);
      fill(col);
      noStroke();
      ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }
  
    getSensorPos(sensor, angle) {
      sensor.x = (this.x + this.sensorDist * cos(angle) + windowWidth) % windowWidth;
      sensor.y = (this.y + this.sensorDist * sin(angle) + windowHeight) % windowHeight;
    }
    hoverEffect() {
        // Calculate distance between mouse and Mold
        let distance = dist(this.x, this.y, mouseX, mouseY);
    
        // Adjust Mold properties based on distance
        if (distance < 100) { // Change 100 to adjust hover sensitivity
          this.r = 1.5; // Increase size
          this.rotAngle = 90; // Increase rotation speed
        } else {
          this.r = 0.5; // Reset size
          this.rotAngle = 45; // Reset rotation speed
        }
      }
    }
    
  
  
  
  function dynamicColor(x, y, offset) {
    let t = millis() / 1000; // Time in seconds
    let angle1 = PI * (x / windowWidth) + t + offset;
    let angle2 = PI * (y / windowHeight) + t + offset + TWO_PI/4;
    let angle3 = PI * ((x + y) / (windowWidth + windowHeight)) + t + offset + (TWO_PI) / 2;
    let r = random(128) + 127 * sin(angle1);
    let g = random(255) + 127 * sin(angle2);
    let b = 255 + 127 * sin(angle3);
    return color(r, g, b);
  }
  