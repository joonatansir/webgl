var gl;
var lastTime = 0;
var canvas;

window.onload = function()
{
    canvas = document.getElementById("webgl");
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

    shaderProgram = gg3d.createShaderProgram(vertexShader, fragmentShader);
    gl.useProgram(shaderProgram);

    vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);
	colorLoc = gl.getAttribLocation(shaderProgram, "color");
	gl.enableVertexAttribArray(colorLoc);

    squareVerticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
	elementBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer);
	
    var vertices = [
        0.0,  1.0, 0.0, 1.0, 0.0, 0.0,
        1.0, -1.0, 1.0, 0.0, 1.0, 0.0,
        -1.0, -1.0, 1.0, 0.0, 0.0, 1.0,
		1.0, -1.0, -1.0, 0.5, 1.0, 0.0,
		-1.0, -1.0, -1.0, 0.5, 1.0, 0.0
    ];

	var indices = [
		0, 1, 2,
		0, 3, 1,
		0, 4, 3,
		0, 2, 4
	];
	
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);
	
    var perspectiveMatrix = mat4.perspective(new Float32Array(16), Math.PI/2, canvas.width/canvas.height, 0.1, 100);
    var uPerspective = gl.getUniformLocation(shaderProgram, "perspective");
    gl.uniformMatrix4fv(uPerspective, gl.FALSE, perspectiveMatrix);
	
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CW);
}

function render(time)
{
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	model = mat4.create();
	mat4.translate(model, model, vec3.fromValues(0, 0, -3));
	mat4.mul(model, model, mat4.rotate(mat4.create(), mat4.create(), time/1000, vec3.fromValues(0, 1, 0)));
	mat4.mul(model, model, mat4.scale(mat4.create(), mat4.create(), vec3.fromValues(1, 1, 1)));
	
	var modelLoc = gl.getUniformLocation(shaderProgram, "model");
	gl.uniformMatrix4fv(modelLoc, gl.FALSE, model);
	
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 6*Float32Array.BYTES_PER_ELEMENT, 0);
	gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 6*Float32Array.BYTES_PER_ELEMENT, 3*Float32Array.BYTES_PER_ELEMENT);
    
	gl.drawElements(gl.LINE_LOOP, 12, gl.UNSIGNED_BYTE, 0);
	//gl.drawArrays(gl.TRIANGLES, 0, 3);

    window.requestAnimationFrame(render);
}
