class Lifemap {
    constructor(elementId) {
        this.fps = 0
        this.canvas = document.getElementById(elementId);
        this.canvas.width = Math.max(
            document.body.scrollWidth,
            document.documentElement.scrollWidth,
            document.body.offsetWidth,
            document.documentElement.offsetWidth,
            document.documentElement.clientWidth
          );
        
        this.canvas.height = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.documentElement.clientHeight
          );
        this.ctx = this.canvas.getContext("2d");
        this.generateEntities();
    }

    generateEntities() {
        this.entites = []
        this.staticEntites = []
        this.entites.push(new Entity(15, new Point(1, -1), "#30336b", 1, "hunter", this))
        this.entites.push(new Entity(12, new Point(1, -1), "#e74c3c", 2, "hunter", this))
        this.entites.push(new Entity(8, new Point(1, -1), "#f1c40f", 2, "hunter", this))
        this.entites.push(new Entity(5, new Point(1, -1), "#d35400", 3, "hunter", this))
        for (var i = 0; i < 50; i++) {
            this.staticEntites.push(new Entity(5, new Point(0, 0), "#badc58", 0, "food", this))
        }
    }

    drawEntities() {
        for (var i = 0; i < this.entites.length; i++) {
            this.entites[i].draw()
        }
        for (var i = 0; i < this.staticEntites.length; i++) {
            this.staticEntites[i].draw()
        }
    }

    moveEntities() {
        for (var i = 0; i < this.entites.length; i++) {
            this.entites[i].move()
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawEntities(); 
    }

    tick() {
        this.moveEntities()
        this.draw()
        this.fps =+ 1

        var map = this
        
        this.loop = setTimeout(function() {map.tick()}, 10);
    }

    start() {
        this.tick()
    }

    stop() {
        clearTimeout(this.loop)
        this.printResult();
    }

    printResult() {
        console.log("Finished")
        for (var i = 0; i < this.entites.length; i++) {
            console.log(this.entites[i].color, this.entites[i].score)
        }
    }
}


var map = new Lifemap("lifemap");
map.start()
// setTimeout(function() {map.stop()}, 15000)


var previousFps = map.fps
setInterval(function() {
    console.log(map.fps - previousFps, map.fps);
    previousFps = map.fps
}, 1000);


