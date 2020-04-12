class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    sub(point) {
        return new Point(this.x - point.x, this.y - point.y)
    }

    distance(point) {
        var vector = point.sub(this)
        return Math.sqrt( vector.x*vector.x + vector.y*vector.y )
    }
}

class Entity {
    constructor(radius, direction, color, speed, type, lifemap) {
        this.radius = radius
        this.searchRadius = radius * 10
        this.lifemap = lifemap
        this.color = color
        this.position = this.generateRandomPosition()
        this.direction = direction
        this.type = type
        this.maxSpeed = speed
        this.score = 0
    }

    generateRandomPosition() {
        // Make sure the entity is created away from walls
        var x = (Math.random() * (this.lifemap.canvas.width-100)) + 50;
        var y = (Math.random() * (this.lifemap.canvas.height-100)) + 50;
        return new Point(x, y)
    }

    move() {
        var toRemove = [];
        var target = null;
        var targetDistance = null
        for (var i = 0; i < this.lifemap.staticEntites.length; i++) {
            var distance = this.getDistance(this.lifemap.staticEntites[i])
            
            if (distance < (this.lifemap.staticEntites[i].radius + this.radius)){
                toRemove.push(i);
            // if not delete check if it's not a target
            } else if (distance < (this.lifemap.staticEntites[i].radius + this.searchRadius)){
                if (target == null || distance < targetDistance) {
                    target = this.lifemap.staticEntites[i];
                    targetDistance = distance;
                }
            }
        }

        for (var i = 0; i < toRemove.length; i++) {
            this.lifemap.staticEntites.splice(toRemove[i], 1)
            this.score += 1
        }

        if (target != null) {
            var direction = target.position.sub(this.position)
            var factor = this.maxSpeed / target.position.distance(this.position)
            this.direction.x = direction.x * factor
            this.direction.y = direction.y * factor
        }

        if(this.position.x + this.direction.x > this.lifemap.canvas.width - this.radius || this.position.x + this.direction.x < this.radius) {
            this.direction.x = -this.direction.x;
        }
        if(this.position.y + this.direction.y > this.lifemap.canvas.height - this.radius || this.position.y + this.direction.y < this.radius) {
            this.direction.y = -this.direction.y;
        }
        
        this.position.x += this.direction.x;
        this.position.y += this.direction.y;
    }

    getDistance(entity) {
        return entity.position.distance(this.position);
    }

    draw() {
        this.lifemap.ctx.beginPath();
        this.lifemap.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2);
        this.lifemap.ctx.fillStyle = this.color;
        this.lifemap.ctx.fill();
        this.lifemap.ctx.closePath();
        if (this.type == "hunter") {
            this.lifemap.ctx.beginPath();
            this.lifemap.ctx.arc(this.position.x, this.position.y, this.searchRadius, 0, Math.PI*2);

            this.lifemap.ctx.stroke();
            this.lifemap.ctx.closePath();         
        }
    }


}