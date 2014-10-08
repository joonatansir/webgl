var gl;
var lastTime = 0;

window.onload = function()
{
    var canvas = document.getElementById("webgl");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if(gl)
    {
        init();
        render();
    }
};

function init()
{
    var fragmentShader = gg3d.createShader(gl, "vertex");
    var vertexShader = gg3d.createShader(gl, "fragment");

    var shaderProgram = gg3d.createShaderProgram(vertexShader, fragmentShader);
    gl.useProgram(shaderProgram);

    vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);

    squareVerticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

    var vertices = [
        0.0,  0.5,  0.0,
        0.5, -0.5,  0.0,
        -0.5,  -0.5, 0.0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

function render(time)
{
    gl.clearColor(1.0, 0.2, 0.2, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    window.requestAnimationFrame(render);
}
