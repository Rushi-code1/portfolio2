var canvas = document.querySelector("#wrapper-canvas");

var dimensions = {
  width: window.innerWidth,
  height: window.innerHeight,
};

Matter.use("matter-attractors");
Matter.use("matter-wrap");

function runMatter() {
  // module aliases
  var Engine = Matter.Engine,
    Events = Matter.Events,
    Runner = Matter.Runner,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Mouse = Matter.Mouse,
    Common = Matter.Common,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Bodies = Matter.Bodies;

  // create engine
  var engine = Engine.create();

  engine.world.gravity.y = 0;
  engine.world.gravity.x = 0;
  engine.world.gravity.scale = 0.1;

  // create renderer
  var render = Render.create({
    element: canvas,
    engine: engine,
    options: {
      showVelocity: false,
      width: dimensions.width,
      height: dimensions.height,
      wireframes: false,
      background: "transparent",
    },
  });

  // create runner
  var runner = Runner.create();

  // create demo scene
  var world = engine.world;
  world.gravity.scale = 0;

  // create a body with an attractor
  var attractiveBody = Bodies.circle(
    render.options.width / 2,
    render.options.height / 2,
    Math.max(dimensions.width / 25, dimensions.height / 25) / 2,
    {
      render: {
        fillStyle: `#000`,
        strokeStyle: `#000`,
        lineWidth: 0,
      },
      isStatic: true,
      plugin: {
        attractors: [
          function (bodyA, bodyB) {
            return {
              x: (bodyA.position.x - bodyB.position.x) * 1e-6,
              y: (bodyA.position.y - bodyB.position.y) * 1e-6,
            };
          },
        ],
      },
    }
  );

  World.add(world, attractiveBody);

  // Add bodies that will be attracted
  const totalBodies = 300; // Set the total number of bodies
  const circleRatio = 0.7; // Set the ratio of circles to the total

  for (let i = 0; i < totalBodies; i += 1) {
    let x = Common.random(0, render.options.width);
    let y = Common.random(0, render.options.height);

    let body;
    // Determine the number of circles to create based on the ratio
    if (i < totalBodies * circleRatio) {
      // Create a circle with small or medium size
      let size;
      // Randomly choose between small (10-20) and medium (20-30) sizes
      if (Math.random() < 0.5) {
        size = Common.random(10, 20); // Small circle
      } else {
        size = Common.random(20, 30); // Medium circle
      }
      body = Bodies.circle(x, y, size, {
        mass: size / 5,
        friction: 0,
        frictionAir: 0.01,
        render: {
          fillStyle: "#191919",
          strokeStyle: `#111111`,
          lineWidth: 3,
        },
      });
    } else {
      // Randomly choose a shape type: 0 for triangle, 1 for rectangle
      let shapeType = Math.floor(Common.random(0, 2));
      if (shapeType === 0) {
        // Create a triangle
        let size = Common.random(20, 50);
        body = Bodies.polygon(x, y, 3, size, {
          mass: size / 20,
          friction: 0,
          frictionAir: 0.02,
          angle: Math.round(Math.random() * 360),
          render: {
            fillStyle: "#222222",
            strokeStyle: `#000000`,
            lineWidth: 2,
          },
        });
      } else {
        // Create a rectangle
        let width = Common.random(20, 60);
        let height = Common.random(20, 60);
        body = Bodies.rectangle(x, y, width, height, {
          mass: (width * height) / 1000,
          friction: 0,
          frictionAir: 0.02,
          angle: Math.round(Math.random() * 360),
          render: {
            fillStyle: "#334443",
            strokeStyle: `#111111`,
            lineWidth: 4,
          },
        });
      }
    }

    World.add(world, body);
  }

  // add mouse control
  var mouse = Mouse.create(render.canvas);

  Events.on(engine, "afterUpdate", function () {
    if (!mouse.position.x) return;
    // smoothly move the attractor body towards the mouse
    Body.translate(attractiveBody, {
      x: (mouse.position.x - attractiveBody.position.x) * 0.12,
      y: (mouse.position.y - attractiveBody.position.y) * 0.12,
    });
  });

  // return a context for MatterDemo to control
  let data = {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function () {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    },
    play: function () {
      Matter.Runner.run(runner, engine);
      Matter.Render.run(render);
    },
  };

  Matter.Runner.run(runner, engine);
  Matter.Render.run(render);
  return data;
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function setWindowSize() {
  let dimensions = {};
  dimensions.width = $(window).width();
  dimensions.height = $(window).height();

  m.render.canvas.width = $(window).width();
  m.render.canvas.height = $(window).height();
  return dimensions;
}

let m = runMatter();
setWindowSize();
$(window).resize(debounce(setWindowSize, 250));
